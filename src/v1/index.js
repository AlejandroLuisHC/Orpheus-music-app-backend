const users     = require("./routes/users.routes")
const tracks    = require("./routes/tracks.routes")
const playlists = require("./routes/playlists.routes")
const moods     = require("./routes/moods.routes")
const genres    = require("./routes/genres.routes")
const events    = require("./routes/events.routes")
const albums    = require("./routes/albums.routes")

module.exports = {
    users,
    tracks,
    playlists,
    moods,
    genres,
    events,
    albums
}