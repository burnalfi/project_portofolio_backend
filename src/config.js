require('dotenv').config();

const process = require('process');

if (!process.env.DB_USER) {console.info("DB_USER can't be empty"); process.exit(1);}
if (!process.env.DB_HOST) {console.info("DB_HOST can't be empty"); process.exit(1);}
if (!process.env.DB_PORT) {console.info("DB_PORT can't be empty"); process.exit(1);}
if (!process.env.DB_NAME) {console.info("DB_NAME can't be empty"); process.exit(1);}
if (!process.env.SECRET_KEY) {console.info("SECRET_KEY can't be empty"); process.exit(1);}

const CONFIG = {
    DATABASE: {
        DB_USER: process.env.DB_USER,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME
    },
    SECRET_KEY: process.env.SECRET_KEY
}

module.exports = CONFIG;