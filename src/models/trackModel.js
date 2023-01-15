const { Schema, model } = require('mongoose')

const trackSchema = new Schema({
    name: {
        type: String,
        required: [true, "the name of the song is required"]
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    file: {
        type: String,
        required: [true, "the file is required"]
    },
    genres: [
        {
            type: Schema.Types.ObjectId, 
            required: [true, "the ID is required"],
            ref: 'genres' 
        }
    ],
    owner: {
        type: String
    }
}, { timestamps: true })

module.exports = model('track', trackSchema)