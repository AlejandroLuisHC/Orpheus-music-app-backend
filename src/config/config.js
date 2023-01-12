require("dotenv").config()

const PORT = process.env.PORT || 4000
const DB = process.env.MONGO_URI || "" // insert your own db
const DB_TEST = process.env.MONGO_URI_TEST || ""

module.exports = {
    PORT,
    DB: DB_TEST
}