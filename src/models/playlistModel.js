const { Schema, model } = require("mongoose")

const playlistSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name is require"]
    },
    description: {
        type: String
    },
    img: {
        type: String
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
    ownership: [
        {
            type: Schema.Types.ObjectId,
            require: [true, "ownership is require"],
            ref: "user"
        }

    ]
}, { timestamps: true })

module.exports = model('playlist', playlistSchema)