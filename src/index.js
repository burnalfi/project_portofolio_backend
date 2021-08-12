require('dotenv').config();

// import dotenv from 'dotenv';
// dotenv.config()

const restify = require('restify');
const mongoose = require('mongoose');

const process = require('process')

// import restify from 'restify';
// import mongoose from 'mongoose';
// import process from 'process';


// import * as projectsRoutes from './routes/projects';
// const projectsRoutes = require('./routes/projects');

if (!process.env.DB_USER) {console.info("DB_USER can't be empty"); process.exit(1);}
if (!process.env.DB_HOST) {console.info("DB_HOST can't be empty"); process.exit(1);}
if (!process.env.DB_PORT) {console.info("DB_PORT can't be empty"); process.exit(1);}
if (!process.env.DB_NAME) {console.info("DB_NAME can't be empty"); process.exit(1);}

const server = restify.createServer({
    name: "Personal Project Portofolio"
});

mongoose.connect(
    `${process.env.DB_USER}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(restify.plugins.jsonBodyParser());
        server.use(restify.plugins.bodyParser({mapParams: true}));

        
        server.get("/", function(_req, res, next) {
            res.send("Hello world!");
            next();
        })

        // Project Routes
        server.get("/projects/get_all", require("./routes/projects").getAll);
        server.post("/projects/add", require("./routes/projects").add);

        server.listen(8080, function() {
            console.log("Server Started Successfully!");
            console.log("%s Listening At %s ...", server.name, server.url);
        })
    }
).catch(e => {
    console.log(e);
    process.exit(1);
})