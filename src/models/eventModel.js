const { Schema, model } = require("mongoose")


const eventSchema = new Schema({
    type: {
        type: String
    },

    img: {
        type: String
    },

    location : {
        type: String
    },

    name: {
            type: String,
            require: [true, "Name are required"]
    },

    description: {
        type: String
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
        require: [true, "Date is require"]
    },

    stock: {
        type: Number
    },

    price: {
        type: Number
    }

}, {timestamps: true})

module.exports = model('event', eventSchema)