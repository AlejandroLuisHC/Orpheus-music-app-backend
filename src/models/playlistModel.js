const { Schema, model } = require("mongoose")

const playlistSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    description: {
        type: String
    },
    img: {
        id: String,       
        url: {
            type: String,
            require: [true, "img is required"]
        }
    },
    files: [
        {
            id: String,
            url: {
                type: String,
                require: [true, "the file is required"]
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
            require: [true, "ownership is required"],
            ref: "user"
        }

    ]
}, { timestamps: true })

module.exports = model('playlist', playlistSchema)