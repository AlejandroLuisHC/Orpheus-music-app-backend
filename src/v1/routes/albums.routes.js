const express = require("express")

const {
    getAllAlbums,
    getAlbumById,
    postAlbum
} = require("../../controllers/albums.controller")

const { checkJwt } = require("../../middlewares/checkJwt.middleware");

const router = express.Router()

router
    .get("/", getAllAlbums)
    .get("/:id", getAlbumById)
    .post("/:id", postAlbum)

    module.exports = router