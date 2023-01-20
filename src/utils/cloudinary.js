// Cloudinary credentials
const {
    CLOUD_NAME,
    CLOUD_KEY,
    CLOUD_SECRET
} = require("./config/config")

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET
});

// Upload a file to Cloudinary
cloudinary.uploader.upload('/ruta/al/archivo.jpg', (err, result) => {
    if (err) return console.error(err);

    console.log(result);
});
