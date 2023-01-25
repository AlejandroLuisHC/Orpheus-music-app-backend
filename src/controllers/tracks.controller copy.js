const mongoose = require("mongoose")
const { Track } = require('../models')
const {
    uploadImage, uploadTrack, destroyImage
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
        const { body, files } = req

        try {
            if (!files?.track) {
                console.log("no hay track");
                return
            } 

            if (files?.image) {
                console.log("files", files)

                const result = await uploadTrack(files.track.tempFilePath)
                console.log("result", result);

                // const { public_id: trackPublicId, secure_url: trackSecureUrl } = await uploadTrack(files.track.tempFilePath)
                // await fs.unlink(files.track.tempFilePath)

                const { public_id: imagePublicId, secure_url: imageSecureUrl } = await uploadImage(files.image.tempFilePath)
                // await fs.unlink(files.image.tempFilePath)

                const newTrack = await Track.create(
                    { 
                        ...body
                        // file: {
                        //     id: trackPublicId,
                        //     url: trackSecureUrl
                        // },
                        // img: {
                        //     id: imagePublicId,
                        //     url: imageSecureUrl
                        // }
                    }
                )

                console.log("newTrack", newTrack)
            }

            res.status(201).send({ status: 'OK', data: newTrack })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send(err.message)
                // .send({ status: 'FAILED', data: { error: err?.message || "error" } })
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

            if (track.video?.id) {
                console.log("track.video.id", track.video.id);
                await destroyImage(track.video.id)
            }

            if (track.img?.id) {
                await destroyImage(track.img.id)
            }

            res.status(204).send({ status: 'OK' })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', data: { error: err?.message || err } })
        }
    },

    patchOneTrack: async (req, res) => {
        const { params: { id }, body, files } = req

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
