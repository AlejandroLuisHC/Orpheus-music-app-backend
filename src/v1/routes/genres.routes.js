const express = require("express")
const {
    getAllGenres,
    postGenre
} = require("../../controllers/genres.controller");
const { checkJwt } = require("../../middlewares/checkJwt.middleware");

const router = express.Router()
router
    .get("/", checkJwt, getAllGenres)
    .post("/", checkJwt, postGenre)
module.exports = router;