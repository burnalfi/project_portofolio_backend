// import { model, Schema } from "mongoose";
const mongoose = require("mongoose");

const ProjectModel = {
    title: String,
    description: String,
    thumbnail_ids: [String],
    link: String
};

const ProjectSchema = new mongoose.Schema(ProjectModel); 

const Project = mongoose.model('project', ProjectSchema);

module.exports = [
    Project,
    ProjectSchema,
    ProjectModel
]