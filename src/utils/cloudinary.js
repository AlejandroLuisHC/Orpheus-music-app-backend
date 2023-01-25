// Cloudinary credentials
const { v2: cloudinary } = require("cloudinary")
const {
    CLOUD_NAME,
    CLOUD_KEY,
    CLOUD_SECRET
} = require("../config/config")

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
    secure: true
});

// Upload an image to Cloudinary
async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        resource_type: 'image',
        folder: "Final-Project-MERN/images-orpheus"
    });   
}

// Upload an audio to Cloudinary
async function uploadTrack(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        resource_type: 'video',
        folder: "Final-Project-MERN/tracks-orpheus"
    });
}

async function destroyImage(publicID) {
    await cloudinary.uploader.destroy(publicID);
}

module.exports = {
    uploadImage,
    uploadTrack,
    destroyImage
}

