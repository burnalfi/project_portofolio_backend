// import * as ProjectsModel from '../models/projects';
const ProjectsModel = require("../models/projects");

exports.add = function(
    title,
    description,
    thumbnail_ids,
    link
) {
    try {
        const project = new ProjectsModel.Project({
            title: title,
            description: description,
            thumbnail_ids: thumbnail_ids,
            link: link
        });

        project.save();

        console.log("Project Successfully Saved");
        return {
            data: project,
            message: "Project Successfully Saved",
            status: 201
        }
    } catch (e) {
        console.log(e.message);
        throw new Error(e.message, { cause: e });
    }
}

exports.getAll = function() {
    try {
        const projects = ProjectsModel.Project.find();
        console.log(projects.tree)
        if (projects.length <= 0) {
            console.log("No Data Was Found");
            return {
                data: null,
                message: "No Data Was Found",
                status: 404
            }
        }

        console.log("Successfully Fetched");
        return {
            data: projects,
            message: "Successfully Fetched",
            status: 200
        }
    } catch (e) {
        console.log(e.message);
        return new Error(e.message, { cause: e });
    }
}