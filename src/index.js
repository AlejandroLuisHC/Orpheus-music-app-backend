const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const fileUpload = require("express-fileupload")
const { connectDB } = require("./utils/mongoose")
const {
    PORT,
    DB,
    APP_ORIGIN,
    VERSION
} = require("./config/config")

app.use(cors({origin: APP_ORIGIN}))
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './assets/tmp'
}))

// Connection to DB
connectDB(app, PORT, DB)

// Routes
const users = require("./v1/routes/users.routes")
app.use(`${VERSION}users`, users)

const playlists = require("./v1/routes/playlists.routes")
app.use(`${VERSION}playlists`, playlists)

const albums = require("./v1/routes/albums.routes")
app.use(`${VERSION}albums`, albums)

const events = require("./v1/routes/events.routes")
app.use(`${VERSION}events`, events)

const tracks = require('./v1/routes/tracks.routes')
app.use(`${VERSION}tracks`, tracks)

const genres = require("./v1/routes/genres.routes")
app.use(`${VERSION}genres`, genres)

const moods = require("./v1/routes/moods.routes")
app.use(`${VERSION}moods`, moods)