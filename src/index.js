require('dotenv').config();

const multer = require('multer');
const restify = require('restify');
const mongoose = require('mongoose');
const rjwt = require('restify-jwt-community');

const CONFIG = require('./config');

const server = restify.createServer({
    name: "Personal Project Portofolio"
});

console.log("SERVER CREATED!")

mongoose.connect(
    `${CONFIG.DATABASE.DB_USER}://${CONFIG.DATABASE.DB_HOST}:${CONFIG.DATABASE.DB_PORT}/${CONFIG.DATABASE.DB_NAME}`, 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        console.log("APP CONNECTED TO MONGODB!");

        // ?
        server.on('InternalServer', function(req, res, error, callback) {
            return callback();
        });
        server.on('restifyError', function(req, res, error, callback) {
            return callback();
        });

        // Middlewares
        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(restify.plugins.bodyParser({mapParams: true}));
        server.use(restify.plugins.urlEncodedBodyParser());
        // server.use(rjwt({ secret: CONFIG.SECRET_KEY })).unless({ path:['/projects/add', '/projects/update/:target_id', '/projects/delete/:target_id'] });

        // Image Uploading Middlewares
        const imageDirectory = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "uploads");
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix);
            }
        });
        const upload = multer({ storage: imageDirectory });

        // Base Route
        server.get("/", function(_req, res, next) {
            res.send("Hello world!");
            next();
        })

        // Projects Routes
        server.get("/projects/get_all", require("./routes/projects").getAll);
        server.post("/projects/add", require("./routes/projects").add);
        server.put("/projects/update/:target_id", require("./routes/projects").updateOne);
        server.del("/projects/delete/:target_id", require("./routes/projects").deleteById);

        // Account Routes
        server.post("/accounts/register", require("./routes/accounts").register);
        server.post("/accounts/login", require("./routes/accounts").auth);

        // Thumbnail Routes
        server.post("/thumbnail/upload", upload.single("thumbnail"), require("./routes/thumbnails").uploadImage);

        server.listen(8080, function() {
            console.log("");
            console.log("+------------%s-----------+", server.name);
            console.log("|                                                  |");
            console.log("|           Server Started Successfully!           |");
            console.log("|                                                  |");
            console.log("|          Listening At %s           |", server.url);
            console.log("|                                                  |");
            console.log("+--------------------------------------------------+");
            console.log("");
        })
    }
)