const { Schema, model } = require("mongoose")

const genreSchema = new Schema({
    name: {
        type: String,
        require: [true, "Genre is required"]
    }
})

module.exports = model('genre', genreSchema)