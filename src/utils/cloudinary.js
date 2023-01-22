// Cloudinary credentials
const { v2: cloudinary } = request("cloudinary")
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

// Upload a file to Cloudinary
async function uploadImage(filePath){
    return await cloudinary.uploader.upload(filePath, {
        folder: "Final-Project-MERN/images-orpheus"
    });
}

module.exports = {
    uploadImage
}
