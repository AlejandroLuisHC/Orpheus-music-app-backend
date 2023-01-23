const { Schema, model } = require("mongoose")

const moodSchema = new Schema({
    name: {
        type: String,
        require: [true, "Mood is required"]
    }
})

module.exports = model('mood', moodSchema)