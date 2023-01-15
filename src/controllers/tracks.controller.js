const mongoose = require("mongoose")
const { Track } = require('../models')

const tracksController = {
    getAllTracks: async (req, res, next) => {
        try {
            const allTracks = await Track.find({})
            res.status(200).send({ status: 'OK', data: allTracks })
            next()
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILDED', data: { error: err?.message || err } })
            next()
        }
        next()
    },

    getOneTrack: async (req, res, next) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                status: 'FAILED',
                data: { error: `${id} is an invalid ID` },
            })
        }

        try {
            const track = await Track.findById(id)
            
            if (!track) {
                return res.status(404).send({
                    status: 'FAILED',
                    data: { error: `Track ${id} was not found` },
                })
            }

            res.status(200).send({ status: 'OK', data: track })
            next()
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILDED', data: { error: err?.message || err } })
            next()
        }
        next()
    },

    postNewTrack: async (req, res, next) => {
        const { body } = req

        try {
            const newTrack = await Track.create({ ...body })
            res.status(201).send({ status: 'OK', data: newTrack })
            next()
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILDED', data: { error: err?.message || err } })
            next()
        }
        next()
    },

    deleteOneTrack: async (req, res, next) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)){
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
            next()
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILDED', data: { error: err?.message || err } })
            next()
        }
        next()
    },

    patchOneTrack: async (req, res, next) => {
        const { params: { id }, body } = req

        if (!mongoose.Types.ObjectId.isValid(id)){
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
            next()
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILDED', data: { error: err?.message || err } })
            next()
        }
        next()
    }
}

module.exports = tracksController
