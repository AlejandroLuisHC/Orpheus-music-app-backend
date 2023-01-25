const { Schema, model } = require("mongoose")

const genreSchema = new Schema({
    name: {
        type: String,
        required: [true, "Genre is required"],
        trim: true
    }
})

module.exports = model('genre', genreSchema)