const express = require("express")
const app = express()
app.use(express.json())

const morgan = require("morgan")
app.use(morgan('dev'))

const cors = require("cors")
const { APP_ORIGIN } = require("./config/config")
app.use(cors({origin: APP_ORIGIN}))

const helmet = require("helmet")
app.use(helmet())

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

const playlists = require("./v1/routes/playlists.routes")
app.use("/api/v1/playlists", playlists)

const albums = require("./v1/routes/albums.routes")
app.use("/api/v1/albums", albums)

const events = require("./v1/routes/events.routes")
app.use("/api/v1/events", events)

const tracks = require('./v1/routes/tracks.routes')
app.use('/api/v1/tracks', tracks)

const genres = require("./v1/routes/genres.routes")
app.use("/api/v1/genres", genres)

const moods = require("./v1/routes/moods.routes")
app.use("/api/v1/moods", moods)