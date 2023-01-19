const { Schema, model } = require("mongoose")

const genreSchema = new Schema({
    name: {
        type: String,
        require: [true, "Genre is requiredd"]
    }
})

module.exports = model('genre', genreSchema)