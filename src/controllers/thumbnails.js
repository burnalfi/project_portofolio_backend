const fs = require('fs');
const path = require('path');
const ThumbnailModel = require("../models/thumbnails");

exports.upload = async function(
    name,
    file
) {
    try {
        const thumbnail = new ThumbnailModel.Thumbnail({
            name: name,
            img: {
                data: fs.readFileSync(path.join( __dirname + "/../../uploads/" + file.name)),
                contentType: file.type
            }
        });

        await thumbnail.save();

        return {
            data: thumbnail,
            message: "Upload Process Successful!",
            status: 201
        }
    } catch (e) {
        console.error("[ThumbnailController|upload] " + e.message);
        return {
            data: null,
            message: e.message,
            status: 500
        }
    }
}