// import * as ProjectsModel from '../models/projects';
const ProjectsModel = require("../models/projects");

 function add(
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

        return  project.save()
        .then(
             () => {
                console.log("Project Successfully Saved");
                return {
                    data: project,
                    message: "Project Successfully Saved",
                    status: 201
                }
            }
        )
        .catch(
             (error) => {
                console.log(error.message);
                throw new Error(error.message, { cause: error })
            }
        )
    } catch (e) {
        console.log(e.message);
        throw new Error(e.message, { cause: e });
    }
}

 function getAll() {
    try {
        return  ProjectsModel.Project.find()
        .then(
             (projects) => {
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
                    data: null,
                    message: "Successfully Fetched",
                    status: 200
                }
            }
        )
    } catch (e) {
        console.log(e.message);
        return new Error(e.message, { cause: e });
    }
}

module.exports = [
    add,
    getAll
]