const ProjectsController = require("../controllers/projects");

 exports.add = function(req, res, next) {
    try {
        console.info(req.body)
        const projects = ProjectsController.add(
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

exports.getAll = function(_req, res, next) {
    try {
        const projects = ProjectsController.getAll();
        res.send(
            projects.status,
            JSON.stringify({
                message: projects.message,
                content: projects.data
            })
        );

        return next();
    } catch (e) {
        console.log(e.message);
            res.send(
            500,
            JSON.stringify({
                message: e.message,
                content: null
            })
        );

        return next();
    }
}