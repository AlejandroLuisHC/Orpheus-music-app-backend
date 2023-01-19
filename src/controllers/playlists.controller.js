const mongoose = require("mongoose")
const { Playlist } = require("../models")

const playlistController = {
    getAllPlaylists: async (req, res) => {
        try {
            const playlists = await Playlist.find({})

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
    getPlaylistById: async (req, res, next) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }

        try {
            const playlist = await Playlist.findById(id)

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
        const { body, params: { id } } = req
        try {
            const playlistExist = await Playlist.findOne({ name: body.name, ownership: id })

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `${id} is an invalid ID`
                })
            }

            if (playlistExist) {
                return res.status(400).send({
                    status: "false",
                    message: "Playlist already exist"
                })
            }
            if (body.ownership) {
                const playlist = await Playlist.create({ ...body, ownership: [id, ...body.ownership] })
                res.status(201).send({
                    status: "Created ",
                    data: playlist
                })
            } else {
                const playlist = await Playlist.create({ ...body, ownership: [id] })
                res.status(201).send({
                    status: "Created ",
                    data: playlist
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

            if (!playlist) {
                res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })
                res.status(200).send(playlist)
            }
        } catch (err) {
            res.status(400).send(err)
        }

    },
    patchPlaylist: async (req, res) => {
        const { params: { id }, body } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }

        try {
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

        } catch (err) {
            res.status(400).send(err)

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