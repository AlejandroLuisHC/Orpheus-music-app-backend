const { Schema, model } = require("mongoose")

const genreSchema = new Schema({
    name: {
        type: String,
        require: [true, "Genre is require"]
    }
})

module.exports = model('genre', genreSchema)