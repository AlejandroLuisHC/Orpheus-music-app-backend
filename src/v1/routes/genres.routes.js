const express = require("express")
const {
    getAllGenres,
    postGenre
} = require("../../controllers/genres.controller")

const router = express.Router()
router
    .get("/", getAllGenres)
    .post("/", postGenre)
module.exports = router;