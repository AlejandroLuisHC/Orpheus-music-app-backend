const { Schema, model } = require("mongoose")


const albumSchema = new Schema({
    name: {
        type: String,
        require: [true, "The name is required"]
    },
    description: {
        type: String,
    },
    thumbnail : {
        type: String,
        require: [true, "The thumbnail is required"]
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
            require: [true, "genre is required"]
        }
    ],
    ownership: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: [true, "album ownership is required"]
        }
    ],
    release: {
        type: String
    }
}, {timestamps: true})

module.exports = model('album', albumSchema)