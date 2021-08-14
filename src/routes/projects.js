const ProjectsController = require("../controllers/projects");

 exports.add = async function(req, res, next) {
    try {
        console.info(req.body)
        const projects = await ProjectsController.add(
            req.body.title,
            req.body.description,
            req.body.thumbnail_ids,
            req.body.link
        )

        res.contentType = 'json';
        res.send(
            projects.status, 
            {
                message: projects.message,
                content: projects.data
            }
        ); return next();

    } catch (e) {
        console.log(e.message);
        
        res.send(
            500,
            {
                message: e.message,
                content: null
            }
        );

        return next();
    }
}

exports.getAll = async function(_req, res, next) {
    try {
        const projects = await ProjectsController.getAll();

        res.contentType = 'json';
        res.send(
            projects.status,
            {
                message: projects.message,
                content: projects.data
            }
        );

        return next();
    } catch (e) {
        console.log(e.message);
        res.contentType = 'json';
            res.send(
            500,
            {
                message: e.message,
                content: null
            }
        );

        return next();
    }
}

exports.updateOne = async function(req, res, next) {
    await ProjectsController.updateOne(
        req.params.target_id,
        req.body.title,
        req.body.description,
        req.body.thumbnail_ids,
        req.body.link
    ).then(
        async (projects) => {
            res.contentType = 'json';
            res.send(
                projects.status,
                {
                    message: projects.message,
                    content: projects.data
                }
            )
            return next();
        }
    ).catch(
        async (error) => {
            res.contenType = 'json';
            res.send(
                500,
                {
                    message: error.message
                }
            )
            return next();
        }
    )
}

exports.deleteById = async function(req, res, next) {
    await ProjectsController
    .deleteByID(req.params.target_id)
    .then(
        async (projects) => {
            res.contentType = 'json';
            res.send(
                projects.status,
                {
                    message: projects.message,
                    content: projects.data
                }
            )

            return next();
        }
    )
    .catch(
        async (error) => {
            res.contenType = 'json';
            res.send(
                500,
                {
                    message: error.message,
                    content: null
                }
            )

            return next();
        }
    )
}