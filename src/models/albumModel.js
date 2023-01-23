const { Schema, model } = require("mongoose")

const albumSchema = new Schema({
    name: {
        type: String,
        require: [true, "The name is requiredd"]
    },
    description: {
        type: String,
    },
    img: {
        type: String,
        require: [true, "The thumbnail is requiredd"]
    },
    tracks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'track',
            require: [true, "Tracks are required"]
        }
    ],
    followers: {
        type: Number
    },
    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'genre',
            require: [true, "genre is requiredd"]
        }
    ],
    ownership: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: [true, "album ownership is requiredd"]
        }
    ],
    release: {
        type: String
    }
}, { timestamps: true })

module.exports = model('album', albumSchema)