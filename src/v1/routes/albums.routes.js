const express = require("express")

const {
    getAllAlbums,
    getAlbumById,
    postAlbum,
    deleteAlbum,
    patchAlbum
} = require("../../controllers/albums.controller")

const { checkJwt } = require("../../middlewares/checkJwt.middleware");

const router = express.Router()

router
    .get("/",        getAllAlbums)
    .get("/:id",    checkJwt, getAlbumById)
    .post("/",      checkJwt, postAlbum)
    .delete("/:id", checkJwt, deleteAlbum)
    .patch("/:id",  checkJwt, patchAlbum)

    module.exports = router