const User = require("../models/userModel")
const Genre = require("../models/genreModel")
const Playlist = require("../models/playlistModel")
const Album = require("./albumModel")
const Track = require("../models/trackModel")

module.exports = {
    User,
    Genre,
    Album,
    Track,
    Playlist
}