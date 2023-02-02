const { Schema, model } = require("mongoose")

const albumSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        trim: true,
        max: 20,
        min: 2
    },
    description: {
        type: String,
        trim: true,
        max: 200,
        min: 2
    },
    img: {
        id: String,
        url: {
            type: String,
            default: 'https://res.cloudinary.com/drghk9p6q/image/upload/v1674479864/Final-Project-MERN/images-orpheus/default-images/playlist_mcyltf.webp'
        }
    },
    tracks: [
        {
            type: Schema.Types.ObjectId,
            ref: "track"
        }
    ],
    followers: {
        type: Number
    },
    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'genre',
            required: [true, "genre is required"]
        }
    ],
    ownership: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "album ownership is required"]
    },
    release: {
        type: Date,
    }
}, { timestamps: true })

module.exports = model('album', albumSchema)