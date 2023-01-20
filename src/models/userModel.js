const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "the username is requiredd"]
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "the email is requiredd"]
    },
    country: {
        type: String,
    },
    region: {
        type: String,
    },
    avatar: {
        type: String,
    },
    banner: {
        type: String,
    },
    favGenres: [
        {
            type: Schema.Types.ObjectId,
            required: [true, "the ID is requiredd"],
            ref: 'genre'
        }
    ],
    favPlaylists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'playlist'
        }
    ],
    favAlbums: [
        {
            type: Schema.Types.ObjectId,
            ref: 'album'
        }
    ],
    favTracks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'track'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isLogged: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = model('user', userSchema)