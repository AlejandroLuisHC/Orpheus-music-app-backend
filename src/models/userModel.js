const { Schema, model } = require("mongoose")
const validator = require("validator")

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "the username is required"],
        trim: true,
    },
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "the email is required"],
        unique: [true, "the email must be unique"],
        trim: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: props => `The email ${props.value} is not valid.`
        }
    },
    country: {
        type: String,
        trim: true,
    },
    region: {
        type: String,
        trim: true,
    },
    img: {
        id: String,       
        url: {
            type: String,
            required: [true, "img is required"],
            default: "https://res.cloudinary.com/drghk9p6q/image/upload/v1674474842/Final-Project-MERN/images-orpheus/default-images/Untitled_design_tvsbzn.webp"
        }
    },
    banner: {
        id: String,       
        url: String
    },
    favGenres: [
        {
            type: Schema.Types.ObjectId,
            required: [true, "the ID is required"],
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