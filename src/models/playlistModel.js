const { Schema, model } = require("mongoose")

const playlistSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
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
            required: [true, "img is required"],
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
            ref: "genre"
        }
    ],
    moods: [
        {
            type: Schema.Types.ObjectId,
            ref: "mood"
        }
    ],
    ownership: {
        type: Schema.Types.ObjectId,
        required: [true, "ownership is required"],
        ref: "user"
    }


}, { timestamps: true })

module.exports = model('playlist', playlistSchema)