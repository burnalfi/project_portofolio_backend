require('dotenv').config();

const restify = require('restify');
const mongoose = require('mongoose');

const process = require('process')

// import * as projectsRoutes from './routes/projects';
const projectsRoutes = require('./routes/projects');

if (!process.env.DB_USER) {console.info("DB_USER can't be empty"); process.exit(1);}
if (!process.env.DB_HOST) {console.info("DB_HOST can't be empty"); process.exit(1);}
if (!process.env.DB_PORT) {console.info("DB_PORT can't be empty"); process.exit(1);}
if (!process.env.DB_NAME) {console.info("DB_NAME can't be empty"); process.exit(1);}

mongoose.connect(
    `${process.env.DB_USER}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        const server = restify.createServer();

        server.get("/", function(_req, res, next) {
            res.send("Hello world!");
            next();
        })

        // Project Routes

        server.get("/projects/get_all", projectsRoutes.getAll);
        server.post("/projects/add", projectsRoutes.add);

        server.listen(8080, function() {
            console.log("Server Started Successfully!");
            console.log("%s Listening At %s ...", server.name, server.url);
        })
    }
).catch(e => {
    console.log(e);
    process.exit(1);
})