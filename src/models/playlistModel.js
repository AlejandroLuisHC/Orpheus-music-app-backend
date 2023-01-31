const { Schema, model } = require("mongoose")

const playlistSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
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
            require: [true, "img is required"],
            default: 'https://res.cloudinary.com/drghk9p6q/image/upload/v1674479864/Final-Project-MERN/images-orpheus/default-images/playlist_mcyltf.webp'
        }
    },
    tracks: [
        {
            type: Schema.Types.ObjectId,
            ref: "track"
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
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