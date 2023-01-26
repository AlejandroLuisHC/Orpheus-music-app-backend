const mongoose = require("mongoose")
const { Album } = require('../models')

const albumController = {
    getAllAlbums: async (req, res) => {
        try {
            const albums = await Album
                .find({})
                .populate("tracks")
                .populate("genres")
                .populate("ownership")
                .lean()

            if (albums.length < 1) {
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
    getAlbumById: async (req, res) => {
        const { body, params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }
        try {
            const album = await Album
                .findById(id)
                .populate("tracks")
                .populate("genres")
                .populate("ownership")
                .lean()
                    
            if (!album) {
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

    postAlbum: async (req, res) => {
        const { body, files } = req

        try {

            const albumExists = await Album.findOne({ name: body.name, ownership: body.ownership[0] })

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `${id} is an invalid ID`
                })
            }

            if (albumExists) {
                res.status(400).send({
                    status: false,
                    massage: "Album already exist"
                })
            }
           
            if(files?.image){

                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)
                await fs.unlink(files.image.tempFilePath)
                
                const album = await Album.create(
                    { ...body,
                        img: { id: public_id, url: secure_url }
                    }
                )
                res.status(201).send({
                    status: "Album created collab 2",
                    data: album
                })

            }else {
                const album = await Album.create({ ...body})
                res.status(201).send({
                    status: "Album created collab 2",
                    data: album
                })
            }
            

        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    deleteAlbum: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `Album ${id} is invalid`
            })
        }

        try {
            const album = await Album.findByIdAndDelete(id)

            if (album.img?.id) {
                await destroyImage(playlist.img.id)
            }

            if (!album) {
                res.status(404).send({
                    status: "FALSE",
                    message: `Album ${id} was not found`
                })

            }

            res.status(200).send(album)

        } catch (error) {
            res.status(400).send(error.message)

        }

    },
    patchAlbum: async (req, res) => {
        const { params: { id }, body, files } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `Album ${id} is invalid`
            })
        }

        try {
            if(files?.image){
                
                const albumFind = await Album.findById(id)
               
                if (albumFind.img?.id) {

                    await destroyImage(albumFind.img.id)
                }
                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)

                await fs.unlink(files.image.tempFilePath)

                const album = await Album.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        img: { id: public_id, url: secure_url }
                    }
                    )
                if (!album) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Album ${id} was not found`
                    })
    
                }
                res.status(201).send({
                    status: "OK",
                    message: `Album ${id} updated successfully`
                })
            }else{
                const album = await Album.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                    }
                    )
                if (!album) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Album ${id} was not found`
                    })
    
                }
                res.status(201).send({
                    status: "OK",
                    message: `Album ${id} updated successfully`
                })
            }
        } catch (error) {
            res.status(400).send(error.message)

        }

    }
}

module.exports = {
    getAllAlbums: albumController.getAllAlbums,
    getAlbumById: albumController.getAlbumById,
    postAlbum: albumController.postAlbum,
    deleteAlbum: albumController.deleteAlbum,
    patchAlbum: albumController.patchAlbum
}