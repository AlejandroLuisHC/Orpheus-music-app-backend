const { Schema, model } = require("mongoose")


const playlistSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name is require"]
    },
    description: {
        type: String
    },
    img:{
        type: String
    },
    tracks:[
        {
            type: Schema.Types.ObjectId, 
            ref:"tracks" 

        }
    ],
    followers:[
        {
            type: Schema.Types.ObjectId, 
            ref:"followers" 

        }
    ],
    genres:[
        {
            type: Schema.Types.ObjectId, 
            ref:"genres" 
        }
    ],
    moods:[
        {
            type: Schema.Types.ObjectId,
            ref:"moods" 
        }
    ],
    ownership:[
        {
            type: Schema.Types.ObjectId, 
            require: [true, "ownership is require"],
            ref:"ownerShip"
        }
        
    ]
}, { timestamps: true })

module.exports = model('playlist', playlistSchema)