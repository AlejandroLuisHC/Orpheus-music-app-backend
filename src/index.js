const express = require("express")
const app = express()
app.use(express.json())

const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Connection to DB
const { connectDB } = require("./utils/mongoose")
const {
    PORT,
    DB
} = require("./config/config")
connectDB(app, PORT, DB)

// Routes
const users = require("./v1/routes/users.routes")
app.use("/api/v1/users", users)

const genres = require("./v1/routes/genres.routes")
app.use("/api/v1/genres", genres)

const playlists = require("./v1/routes/playlists.routes")
app.use("/api/v1/playlists", playlists)

const albums = require("./v1/routes/albums.routes")
app.use("/api/v1/albums", albums)

const tracks = require('./v1/routes/tracks.routes')
app.use('/api/v1/tracks', tracks)
