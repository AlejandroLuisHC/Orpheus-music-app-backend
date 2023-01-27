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
                    path: 'tracks',
                    populate: {
                        path: 'ownership',
                    }
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
        try {

            const playlistExist = await Playlist.findOne({ name: body.name, ownership: body.ownership[0] })

            if (!mongoose.Types.ObjectId.isValid(body.ownership[0])) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `${body.ownership[0]} is an invalid ID`
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
                        img: { id: public_id, url: secure_url },
                    }
                )

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership[0] },
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
                    }
                )

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership[0] },
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
            await fs.unlink(files?.image?.tempFilePath)
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
            const playlistFind = await Playlist.findById(id)
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
            const updatedUser = await User.findByIdAndUpdate(
                { _id: playlistFind.ownership[0] },
                { "$pull": { playlists: id } }

            )

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
                console.log(files?.image)
                const playlistFind = await Playlist.findById(id)
                // Destroy previous image from cloudinary
                if (playlistFind.img?.id) {

                    await destroyImage(playlistFind.img.id)
                }

                //  const track = await Track.findByIdAndUpdate({_id:body.track._id},
                //     {playlist: [body.track._id, ...track.playlist]})   
                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)

                await fs.unlink(files.image.tempFilePath)

                const playlist = await Playlist.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        img: { id: public_id, url: secure_url }
                    }
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
                    { ...body }
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
            await fs.unlink(files?.image?.tempFilePath)
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