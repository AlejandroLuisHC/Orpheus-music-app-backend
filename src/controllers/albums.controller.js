const mongoose = require("mongoose")
const {Album} = require('../models') 

const albumController = {
    getAllAlbums: async(req,res) => {
        try {
            const albums = await Album.find({})
            if (albums.length < 1){
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                })
            }

            res.status(200).send(albums)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    getAlbumById: async(req, res) => {
        const { body, params: {id} } = req

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }
        try {
            const album = await Album.findById(id)
            if(!album){
                return res.status(404).send({
                    status: "FALSE",
                    message: `Album ${id} was not found`
                })
            }

            res.status(200).send(album)

        } catch (error) {
            res.status(400).send(error.message)
            
        }
    },

    postAlbum: async(req, res) => {
        const { body, params: {id} } = req
        
        try {
            const albumExists = await Album.findOne({ name: body.name, ownership: id })
            if(albumExists){
                res.status(400).send({
                    status: false,
                    massage: "Album already exist"
                })
            }

            // if(body.ownership){
            //     console.log(id, body.ownership)

            //     const album = await Album.create({...body,ownership:[id, ...body.ownership]})
            //     res.status(201).send({
            //         status: "Album created collab 2",
            //         data: album
            //     })
            // }else{
            //     console.log('<<<<<< 2 2')
            //     const album = await Album.create({...body, ownership:[id]})
            //     res.status(201).send({
            //         status: "Album created 1",
            //         data: album
            //     })
            // }
            const album = await Album.create({...body, ownership:[id]})
                 res.status(201).send({
                     status: "Album created 1",
                     data: album
                 })
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

module.exports = {
    getAllAlbums: albumController.getAllAlbums,
    getAlbumById: albumController.getAlbumById,
    postAlbum: albumController.postAlbum
}