const { Schema, model } = require("mongoose")


const eventSchema = new Schema({
    img: {
        id: String,
        url: {
            type: String,
            required: [true, "img is required"],
            default: ""
        }
    },

    location: {
        type: String,
        trim: true
    },

    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        max: 40,
        min: 4,
        unique: [true, "Name must be unique"]
    },

    description: {
        type: String,
        trim: true,
        max: 200,
    },

    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: 'genre',
        }
    ],

    artists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ],

    date: {
        type: Date,
        required: [true, "Date is required"]
    },

    stock: {
        type: Number
    },

    price: {
        type: Number
    }

}, { timestamps: true })

module.exports = model('event', eventSchema)