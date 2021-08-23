const ThumbnailController = require("../controllers/thumbnails");

exports.uploadImage = async function(req, res, next) {
    try {
        if (!req.files) { res.send(400, { message: "Thumnail Can't Be Empty!" }); return next(); };
        
        const name = req.body.name;
        const picture = req.files.thumbnail;

        const thumbnail = await ThumbnailController.upload(
            name,
            picture    
        );

        res.contentType = 'json';
        res.send(
            thumbnail.status,
            {
                message: thumbnail.message,
                content: thumbnail.data
            }
        );
        return next();
    } catch (e) {
        console.error("[ThumbnailRoutes|uploadImage] " + e.message);
        res.contentType = 'json';
        res.send(
            500,
            {
                message: e.message,
                content: null
            }
        )
        return next();
    }
}

exports.getAll = async (req, res, next) => {
    try { 
        const thumbnail = await ThumbnailController.getAll();

        res.contentType = 'json';
        res.send(
            thumbnail.status,
            {
                message: thumbnail.message,
                content: thumbnail.data
            }
        );
        return next();
    } catch (e) {
        console.error("[ThumbnailRoutes|uploadImage] " + e.message);
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

exports.getThumbnail = async (req, res, next) => {
    try {
        const file_id = req.params.file_id;

        const thumbnail = await ThumbnailController.getThumbnail(file_id);

        res.contentType = `${thumbnail.data.contentType}`;
        res.send(thumbnail.data.img.data);
        return next();
    } catch (e) {
        console.error("[ThumbnailRoutes|uploadImage] " + e.message);
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