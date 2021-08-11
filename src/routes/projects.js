const ProjectsController = require("../controllers/projects");

 function add(req, res, next) {
    try {
        return  ProjectsController.add(
            req.body.title,
            req.body.description,
            req.body.thumbnail_ids,
            req.body.link
        ).then(
             (projects) => {
                res.status(projects.status).send({
                    message: projects.message,
                    content: projects.data
                })
                return next();
            }
        )
    } catch (e) {
        console.log(e.message);
        
        res.status(500).send({
            message: e.message,
            content: null
        });

        return next();
    }
}

 function getAll(_req, res, next) {
    try {
        return  ProjectsController.getAll()
        .then(
             (projects) => {
                res.status(projects.status).send({
                    message: projects.message,
                    content: projects.data
                });

                return next();
            }
        );
    } catch (e) {
        console.log(e.message);
        
        res.status(500).send({
            message: e.message,
            content: null
        });

        return next();
    }
}

module.exports = [
    add,
    getAll
]