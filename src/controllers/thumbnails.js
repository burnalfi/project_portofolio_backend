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
                data: fs.readFileSync(file.path),
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

exports.getAll = async () => {
    return await ThumbnailModel.Thumbnail.find()
    .then(async (thumbnail) => {
        if (thumbnail == null) {
            console.log("No Data Was Found");
            return {
                data: null,
                status: 404,
                message: "No Data Was Found"
            };
        }

        console.log("Data Successfully Fetched!");
        return {
            data: thumbnail,
            message: "Data Successfully Fetched!",
            status: 200
        };
    })
    .catch(async (err) => {
        console.error("[ThumnailController|getAll] " + err.message);
        return {
            data: null,
            message: err.message,
            status: 500
        }
    });
}

exports.getThumbnail = async ( id ) => {
    return await ThumbnailModel.Thumbnail.findById(id)
    .then(async (thumbnail) => {
        if (thumbnail == null) {
            console.log("No Data Was Found");
            return {
                data: null,
                status: 404,
                message: "No Data Was Found"
            };
        }

        console.log("Data Successfully Fetched!");
        return {
            data: thumbnail,
            message: "Data Successfully Fetched!",
            status: 200
        };
    })
    .catch(async (err) => {
        console.error("[ThumnailController|getAll] " + err.message);
        return {
            data: null,
            message: err.message,
            status: 500
        }
    });
}