const mongoose = require("mongoose");

const ThumbnailModel = {
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
}

const ThumbnailSchema = new mongoose.Schema(ThumbnailModel);

exports.Thumbnail = mongoose.model('thumbnail', ThumbnailSchema);