const { Schema, model } = require('mongoose')

const trackSchema = new Schema({
    name: {
        type: String,
        required: [true, "the name of the song is requiredd"]
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    file: {
        type: String,
        required: [true, "the file is requiredd"]
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
            required: [true, "the ownership is requiredd"],
            ref: 'user'
        }
    ]
}, { timestamps: true })

module.exports = model('track', trackSchema)
