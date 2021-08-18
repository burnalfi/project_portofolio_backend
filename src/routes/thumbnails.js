const ThumbnailController = require("../controllers/thumbnails");

exports.uploadImage = async function(req, res, next) {
    try {
        const thumbnail = await ThumbnailController.upload(
            req.body.name,
            req.files.thumbnail
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