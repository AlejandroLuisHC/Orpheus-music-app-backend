const mongoose = require("mongoose")
const { Playlist, User } = require("../models")
const fs = require('fs-extra')
const {
    uploadImage, destroyImage
} = require("../utils/cloudinary")

const playlistController = {
    getAllPlaylists: async (req, res) => {
        try {
            const playlists = await Playlist
                .find({})
                .populate("tracks")
                .populate("followers")
                .populate("genres")
                .populate("moods")
                .populate("ownership")
                .lean()


            if (playlists.length < 1) {
                return res.status(404).send({
                    status: "False",
                    message: "The DB id currently empty"
                })
            }
            res.status(200).send(playlists)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    getPlaylistById: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }

        try {
            const playlist = await Playlist
                .findById(id)
                .populate({
                    path: "tracks",
                    populate: "ownership"
                })
                .populate("followers")
                .populate("genres")
                .populate("moods")
                .populate("ownership")
                .lean()

            if (!playlist) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `Playlist ${id} was not found`
                })
            }


            res.status(200).send(playlist)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    postPlaylist: async (req, res) => {
        const { body, files } = req
        
        const moods = body.mood?.split()
        
        
        try {

             const playlistExist = await Playlist.findOne({ name: body.name, ownership: body.ownership })

            if (!mongoose.Types.ObjectId.isValid(body.ownership)) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `${body.ownership} is an invalid ID`
                })
            }

            if (playlistExist) {
                return res.status(400).send({
                    status: "false",
                    message: "Playlist already exist"
                })
            }

            if (files?.image) {
                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)
                await fs.unlink(files.image.tempFilePath)
              
                const playlist = await Playlist.create(
                    {
                        ...body,
                        moods,
                        img: { id: public_id, url: secure_url },
                    },
                    
                )

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership },
                    {
                        "$push": { playlists: playlist.id }
                    },
                    { new: true }
                )
                res.status(201).send({
                    status: "Created ",
                    data:
                    {
                        playlist,
                        updatedUser
                    }
                })

            } else {
             
                const playlist = await Playlist.create(
                    {
                        ...body,
                        moods,
                    }
                )

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership },
                    {
                        "$push": { playlists: playlist.id }
                    },
                    { new: true }
                )

                res.status(201).send({
                    status: "Created ",
                    data:
                    {
                        playlist,
                        updatedUser
                    }
                })
            }

        } catch (err) {
            res.status(400).send(err.message)
        }
    },
    deletePlaylist: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }

        try {

            const playlist = await Playlist.findByIdAndDelete(id)
            if (playlist.img?.id) {
                await destroyImage(playlist.img.id)
            }

            if (!playlist) {
                res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })
            }

            res.status(200).send({
                status: "Deleted  ",
                data:
                {
                    playlist,
                    updatedUser
                }
            })
        } catch (err) {
            res.status(400).send(err.message)
        }

    },
    patchPlaylist: async (req, res) => {
        const { params: { id }, body, files } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }

        try {
            if (files?.image) {

                const playlistFind = await Playlist.findById(id)

                if (playlistFind.img?.id) {

                    await destroyImage(playlistFind.img.id)
                }

                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)

                await fs.unlink(files.image.tempFilePath)

                const playlist = await Playlist.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        img: { id: public_id, url: secure_url }
                    },
                    { new: true }
                )
                if (!playlist) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Playlist ${id} was not found`
                    })

                }
                res.status(201).send({
                    status: "OK",
                    message: `Playlist ${id} updated successfully`
                })

            } else {
                const playlist = await Playlist.findByIdAndUpdate(
                    { _id: id },
                    { ...body },
                    { new: true }
                )
                if (!playlist) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Playlist ${id} was not found`
                    })

                }
                res.status(201).send({
                    status: "OK",
                    message: `Playlist ${id} updated successfully`
                })
            }
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = {
    postPlaylist: playlistController.postPlaylist,
    getAllPlaylists: playlistController.getAllPlaylists,
    getPlaylistById: playlistController.getPlaylistById,
    deletePlaylist: playlistController.deletePlaylist,
    patchPlaylist: playlistController.patchPlaylist
}