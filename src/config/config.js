require("dotenv").config()

const PORT           = process.env.PORT || 4000
const DB             = process.env.MONGO_URI 
const DB_TEST        = process.env.MONGO_URI_TEST 
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE
const AUTH0_ISSUER   = process.env.AUTH0_ISSUER
const APP_ORIGIN     = process.env.APP_ORIGIN

module.exports = {
    PORT,
    DB: DB_TEST,
    AUTH0_AUDIENCE,
    AUTH0_ISSUER,
    APP_ORIGIN
}