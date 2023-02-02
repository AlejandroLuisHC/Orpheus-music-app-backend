const { Schema, model } = require("mongoose")

const moodSchema = new Schema({
    name: {
        type: String,
        required: [true, "Mood is required"],
        trim: true,
        max: 20,
        min: 2
    }
}, { timestamps: true })

module.exports = model('mood', moodSchema)