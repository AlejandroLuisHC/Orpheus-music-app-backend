const mongoose = require("mongoose")
const { Track } = require('../models')
const {
    uploadImage, destroyImage, uploadTrack
} = require("../utils/cloudinary")
const fs = require("fs-extra")

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
        const { body, files, params: { id } } = req

        console.log(files)

        try {
            if (!files?.track) {
                return res.status(400).send({
                    status: "FAILED",
                    message: "the track file is required"
                })

            } else if (files?.image) {
                const trackResult = await uploadTrack(files.track.tempFilePath)
                console.log("trackResult", trackResult)

                const imageResult = await uploadImage(files.image.tempFilePath)
                console.log("imageResult", imageResult)

                // await fs.unlink(files.track.tempFilePath)

                const newTrack = await Track.create({ 
                    ...body,
                    file: {
                        id: trackResult.public_id,
                        url: trackResult.secure_url
                    }
                })
            }

            // const newTrack = await Track.create({ 
            //     ...body,
            //     file: {
            //         id: 
            //     }
            // })

            // if (files?.image) {
            //     const result = await uploadImage(files.image.tempFilePath)
            //     console.log(result)

            //     newTrack.img = {
            //         id: result.public_id,
            //         url: result.secure_url
            //     }

            //     await fs.unlink(files.image.tempFilePath) 
            // }

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
