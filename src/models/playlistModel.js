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
            required: [true, "img is required"]
        }
    },
    files: [
        {
            id: String,
            url: {
                type: String,
                required: [true, "the file is required"]
            }
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
    ownership: [
        {
            type: Schema.Types.ObjectId,
            required: [true, "ownership is required"],
            ref: "user"
        }

    ]
}, { timestamps: true })

module.exports = model('playlist', playlistSchema)