const { Schema, model } = require('mongoose')

const trackSchema = new Schema({
    name: {
        type: String,
        required: [true, "the name of the song is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    img: {
        id: String,
        url: {
            type: String,
            // required: [true, "img is required"],
            default: "https://res.cloudinary.com/drghk9p6q/image/upload/v1674479861/Final-Project-MERN/images-orpheus/default-images/track_okeksf.webp"
        }
    },
    file: {
        id: String,
        url: {
            type: String,
            // required: [true, "the file is required"]
        }
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'album'
    },
    playlists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'playlist'
        }
    ],
    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'genre'
        }
    ],
    ownership: [
        {
            type: Schema.Types.ObjectId,
            // required: [true, "the ownership is required"],
            ref: 'user'
        }
    ]
}, { timestamps: true })

module.exports = model('track', trackSchema)
