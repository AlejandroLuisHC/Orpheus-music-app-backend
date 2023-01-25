const mongoose = require("mongoose")
const { Track } = require('../models')

const tracksController = {
    getAllTracks: async (req, res) => {
        try {
            const allTracks = await Track
                .find({})
                .populate("album")
                .populate("playlists")
                .populate("genres")
                .populate("ownership")
                .lean()

            res.status(200).send({ status: 'OK', data: allTracks })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', data: { error: err?.message || err } })
        }
    },

    getOneTrack: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: 'FAILED',
                data: { error: `${id} is an invalid ID` },
            })
        }

        try {
            const track = await Track
                .findById(id)
                .populate("album")
                .populate("playlists")
                .populate("genres")
                .populate("ownership")
                .lean()
                
            if (!track) {
                return res.status(404).send({
                    status: 'FAILED',
                    data: { error: `Track ${id} was not found` },
                })
            }

            res.status(200).send({ status: 'OK', data: track })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', data: { error: err?.message || err } })
        }
    },

    postNewTrack: async (req, res) => {
        const { body, params: { id } } = req

        try {
            const newTrack = await Track.create({ ...body, ownership: [id, ...body.ownership] })
            res.status(201).send({ status: 'OK', data: newTrack })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', data: { error: err?.message || err } })
        }
    },

    deleteOneTrack: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: 'FAILED',
                data: { error: `${id} is an invalid ID` },
            })
        }

        try {
            const track = await Track.findByIdAndDelete(id)
                
            if (!track) {
                return res.status(404).send({
                    status: 'FAILED',
                    data: { error: `Track ${id} was not found` },
                })
            }

            res.status(204).send({ status: 'OK' })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', data: { error: err?.message || err } })
        }
    },

    patchOneTrack: async (req, res) => {
        const { params: { id }, body } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: 'FAILED',
                data: { error: `${id} is an invalid ID` },
            })
        }

        try {
            const track = await Track.findByIdAndUpdate(
                { _id: id },
                { ...body }
            )

            if (!track) {
                return res.status(404).send({
                    status: 'FAILED',
                    data: { error: `Track ${id} was not found` },
                })
            }

            res.status(201).send({ status: 'OK', data: track })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILDED', data: { error: err?.message || err } })
        }
    }
}

module.exports = tracksController
