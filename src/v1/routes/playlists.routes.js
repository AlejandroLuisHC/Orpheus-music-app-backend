const express = require("express")
const {
    postPlaylist,
    getAllPlaylists,
    getPlaylistById,
    deletePlaylist,
    patchPlaylist
} = require("../../controllers/playlists.controller")

const router = express.Router()
router
    .get("/",getAllPlaylists)
    .get("/:id",getPlaylistById)
    .post("/:id",postPlaylist)
    .delete("/:id",deletePlaylist)
    .patch("/:id",patchPlaylist)

module.exports = router;