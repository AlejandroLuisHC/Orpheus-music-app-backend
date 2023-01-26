const express = require("express")
const {
    postPlaylist,
    getAllPlaylists,
    getPlaylistById,
    deletePlaylist,
    patchPlaylist
} = require("../../controllers/playlists.controller")
const { checkJwt } = require("../../middlewares/checkJwt.middleware")
const router = express.Router()
router
    .get("/",       checkJwt,getAllPlaylists)
    .get("/:id",    checkJwt,getPlaylistById)
    .post("/",   postPlaylist)
    .delete("/:id", deletePlaylist)
    .patch("/:id",   patchPlaylist)

module.exports = router;