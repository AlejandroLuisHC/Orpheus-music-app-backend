const { Schema, model } = require("mongoose")

const genreSchema = new Schema({
    name: {
        type: String,
        required: [true, "Genre is required"],
        trim: true
    }
}, { timestamps: true })

module.exports = model('genre', genreSchema)