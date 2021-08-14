require('dotenv').config();

const restify = require('restify');
const mongoose = require('mongoose');

const process = require('process');

if (!process.env.DB_USER) {console.info("DB_USER can't be empty"); process.exit(1);}
if (!process.env.DB_HOST) {console.info("DB_HOST can't be empty"); process.exit(1);}
if (!process.env.DB_PORT) {console.info("DB_PORT can't be empty"); process.exit(1);}
if (!process.env.DB_NAME) {console.info("DB_NAME can't be empty"); process.exit(1);}

const server = restify.createServer({
    name: "Personal Project Portofolio"
});

console.log("SERVER CREATED!")

mongoose.connect(
    `${process.env.DB_USER}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        server.on('InternalServer', function(req, res, error, callback) {
            return callback();
        })
        server.on('restifyError', function(req, res, error, callback) {
            return callback();
        })

        console.log("APP CONNECTED TO MONGODB!")

        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(restify.plugins.bodyParser({mapParams: true}));

        
        server.get("/", function(_req, res, next) {
            res.send("Hello world!");
            next();
        })

        // Projects Routes
        server.get("/projects/get_all", require("./routes/projects").getAll);
        server.post("/projects/add", require("./routes/projects").add);
        server.put("/projects/update/:target_id", require("./routes/projects").updateOne);
        server.del("/projects/delete/:target_id", require("./routes/projects").deleteById);


        server.listen(8080, function() {
            console.log("");
            console.log("+------------%s-----------+", server.name);
            console.log("|                                                  |");
            console.log("|         Server Started Successfully!             |");
            console.log("|                                                  |");
            console.log("|        Listening At %s             |", server.url);
            console.log("|                                                  |");
            console.log("+--------------------------------------------------+");
            console.log("");
        })
    }
)