const ProjectsModel = require("../models/projects");

exports.add = async function(
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

        return await project.save()
        .then(
            async (projects) => {
                console.log("Project Successfully Saved");
                return {
                    data: projects,
                    message: "Project Successfully Saved",
                    status: 201
                };
            }
        ).catch(
            async (error) => {
                console.log(error.message);
                throw new Error(error.message, { cause: e });
            }
        )
    } catch (e) {
        console.log(e.message);
        throw new Error(e.message, { cause: e });
    }
}

exports.getAll = async function() {
    return await ProjectsModel.Project.find().then(
        async (projects) => {
            console.log(projects);
            if (projects.length <= 0) {
                console.log("No Data Was Found");
                return {
                    data: null,
                    message: "No Data Was Found",
                    status: 404
                };
            }

            console.log("Successfully Fetched");
            return {
                data: projects,
                message: "Successfully Fetched",
                status: 200
            };
        }
    ).catch(
        async (error) => {
            console.log(error.message);
            throw new Error(e.message, { cause: e });
        }
    );
}

exports.updateOne = async function (
    target_id,
    title,
    description,
    thumbnail_ids,
    link
) {
    if (await ProjectsModel.Project.findById(target_id) == null) {
        return {
            data: null,
            message: `Project With ID ${target_id} Was Not Found`
        }
    }
    return await ProjectsModel.Project.findByIdAndUpdate(
        target_id, { title: title, description: description, thumbnail_ids: thumbnail_ids, link: link }, { new: true }
    ).then(
        async (projects) => {
            if (projects == null) {
                console.log("Update Process Failed");
                return {
                    data: null,
                    message: "Update Process Failed",
                    status: 400
                }
            }

            console.log("Update Process Successful!");
            return {
                data: projects,
                message: "Update Process Successful!",
                status: 201
            };
        }
    ).catch(
        async (error) => {
            console.log(error.message);
            return new Error(error.message, { cause: e })
        }
    );
}

exports.deleteByID = async function( target_id ) {
    if (await ProjectsModel.Project.findById(target_id) == null) {
        return {
            data: null,
            message: `Project With ID ${target_id} Was Not Found`
        }
    }
    return await ProjectsModel.Project.findByIdAndDelete(target_id)
    .then(
        async (projects) => {
            console.log(projects);
            if (projects == null) {
                console.log("Deletion Process Failed");
                return {
                    data: null,
                    message: "Deletion Process Failed",
                    status: 400
                };
            }

            console.log("Deletion Process Successful!");
            return {
                data: projects,
                message: "Deletion Process Successful!",
                status: 200
            };
        }
    ).catch(
        async (error) => {
            console.log(error.message);
            throw new Error(error.message, { cause: error })
        }
    )
}