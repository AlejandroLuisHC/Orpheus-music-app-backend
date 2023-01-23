require("dotenv").config()

// DB connection
const PORT           = process.env.PORT || 4000
const DB             = process.env.MONGO_URI 
const DB_TEST        = process.env.MONGO_URI_TEST 

// Auth0
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE
const AUTH0_ISSUER   = process.env.AUTH0_ISSUER

// Front page
const APP_ORIGIN     = process.env.APP_ORIGIN

// Cloudinary
const CLOUD_NAME     = process.env.CLOUD_NAME
const CLOUD_KEY      = process.env.CLOUD_KEY
const CLOUD_SECRET   = process.env.CLOUD_SECRET

module.exports = {
    PORT,
    DB: DB_TEST,
    AUTH0_AUDIENCE,
    AUTH0_ISSUER,
    APP_ORIGIN,
    CLOUD_NAME,
    CLOUD_KEY,
    CLOUD_SECRET
}