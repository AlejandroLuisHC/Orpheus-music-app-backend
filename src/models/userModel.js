const { Schema, model } = require("mongoose")

// const userDataSchema = new Schema({
//     username: {
//         type: String,
//         required: [true, "the username is required"]
//     },
//     firstname: {
//         type: String,
//     },
//     lastname: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: [true, "the email is required"]
//     },
//     country: {
//         type: String,
//     },
//     region: {
//         type: String,
//     },
//     avatar: {
//         type: String,
//     },
//     banner: {
//         type: String,
//     },
//     favGenres: [
//         {
//             type: Schema.Types.ObjectId, 
//             required: [true, "the ID is required"],
//             ref: 'favGenre' 
//         }
//     ]
// })

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "the username is required"]
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "the email is required"]
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
            required: [true, "the ID is required"],
            ref: 'favGenre' 
        }
    ],
    favPlaylists: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'favPlaylist' 
        }
    ],
    favAlbums: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'favAlbum' 
        }
    ],
    favTracks: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'favTrack' 
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'follower' 
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'following' 
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