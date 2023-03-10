const mongoose = require("mongoose")
const { Album, User } = require('../models')
const fs = require('fs-extra')
const {
    uploadImage, destroyImage
} = require("../utils/cloudinary")

const albumController = {
    getAllAlbums: async (req, res) => {
        try {
            const albums = await Album
                .find({})
                .populate({
                    path: "tracks",
                    populate: "ownership"
                })
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
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }
        try {
            const album = await Album
                .findById(id)
                .populate({
                    path: "tracks",
                    populate: "ownership"
                })
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
        const tracks = body.tracks.split(',')
        
        try {

            const albumExists = await Album.findOne({ name: body.name, ownership: body.ownership })

            if (!mongoose.Types.ObjectId.isValid(body.ownership)) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `${body.ownership} is an invalid ID`
                })
            }

            if (albumExists) {
                res.status(400).send({
                    status: false,
                    massage: "Album already exist"
                })
            }

            if (files?.image) {

                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)
                await fs.unlink(files.image.tempFilePath)

                const album = await Album.create(
                    {
                        ...body,
                        tracks,
                        img: { id: public_id, url: secure_url }
                    })

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership },
                    {
                        "$push": { albums: album.id }
                    },
                    { new: true }
                )
                res.status(201).send({
                    status: "Created ",
                    data:
                    {
                        album,
                        updatedUser
                    }
                })


            } else {
                const album = await Album.create({ ...body,tracks })

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership },
                    {
                        "$push": { albums: album.id }
                    },
                    { new: true }
                )
                res.status(201).send({
                    status: "Created ",
                    data:
                    {
                        album,
                        updatedUser
                    }
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
            // const albumFind = await Album.findById(id)
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


            res.status(200).send({
                status: "Deleted  ",
                data:
                {
                    album,
                    updatedUser
                }
            })

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
            const album = await Album.findById(id)

            if (files?.image) {


                if (!album) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Album ${id} was not found`
                    })
                }

                if (album.img?.id) {

                    await destroyImage(albumFind.img.id)
                }
                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)

                await fs.unlink(files.image.tempFilePath)

                await Album.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        img: { id: public_id, url: secure_url }
                    },
                    { new: true }
                )


                res.status(201).send({
                    status: "OK",
                    message: `Album ${id} updated successfully`
                })
            } else {

                if (!album) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Album ${id} was not found`
                    })

                }
                await Album.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                    },
                    { new: true }
                )

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