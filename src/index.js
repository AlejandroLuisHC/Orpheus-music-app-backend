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
    VERSION,
    ROUTING_VERSION
} = require("./config/config")

// Middlewares
app.use(cors({ origin: APP_ORIGIN }))
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/assets/tmp'
}))

// Connection to DB
connectDB(app, PORT, DB)

// Routes
const { users } = require(ROUTING_VERSION)
app.use(`${VERSION}users`, users)

const { playlists } = require(ROUTING_VERSION)
app.use(`${VERSION}playlists`, playlists)

const { albums } = require(ROUTING_VERSION)
app.use(`${VERSION}albums`, albums)

const { events } = require(ROUTING_VERSION)
app.use(`${VERSION}events`, events)

const { tracks } = require(ROUTING_VERSION)
app.use(`${VERSION}tracks`, tracks)

const { genres } = require(ROUTING_VERSION)
app.use(`${VERSION}genres`, genres)

const { moods } = require(ROUTING_VERSION)
app.use(`${VERSION}moods`, moods)