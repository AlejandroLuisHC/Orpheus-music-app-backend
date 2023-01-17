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
            ref: 'tracks',
            require: [true, "Tracks are required"]
        }
    ],
    followers: {
        type: Number
    },
    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'genres',
            require: [true, "genre is require"]
        }
    ],
    ownership: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ownership',
            require: [true, "ownership is require"]
        }
    ],
    release: {
        type: String
    }
}, {timestamps: true})

module.exports = model('album', albumSchema)