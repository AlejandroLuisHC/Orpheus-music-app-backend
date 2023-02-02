const mongoose = require("mongoose")
const { Track, User } = require('../models')
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
                .send({ status: 'FAILED', error: err?.message })
        }
    },

    getOneTrack: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: 'FAILED',
                message: `${id} is an invalid ID`
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
                    message: `Track ${id} was not found`
                })
            }

            res.status(200).send({ status: 'OK', data: track })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', error: err?.message })
        }
    },

    postNewTrack: async (req, res) => {
        const { body, files } = req

        try {
            const trackExist = await Track.findOne({
                name: body.name,
                ownership: body.ownership
            })

            if (!mongoose.Types.ObjectId.isValid(body.ownership)) {
                return res.status(404).send({
                    status: 'FAILED',
                    messase: `${body.ownership} is an invalid ID`
                })
            }

            if (trackExist) {
                return res.status(400).send({
                    status: 'FAILED',
                    message: "This track already exists",
                })
            }

            if (!files?.video) {
                return res.status(400).send({
                    status: "FAILED",
                    message: "The track file is required"
                })
            }
            
            const videoResult = await uploadTrack(files.video.tempFilePath)
            await fs.unlink(files.video.tempFilePath)

            if (files?.image) {
                const imageResult = await uploadImage(files.image.tempFilePath)
                await fs.unlink(files.image.tempFilePath)

                const newTrack = await Track.create({ 
                    ...body,
                    file: {
                        id: videoResult.public_id,
                        url: videoResult.secure_url
                    },
                    img: {
                        id: imageResult.public_id,
                        url: imageResult.secure_url
                    }
                })

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership },
                    { "$push": { tracks: newTrack.id } },
                    { new: true }
                )

                res.status(201).send({ 
                    status: 'OK', 
                    data: { 
                        newTrack, 
                        updatedUser 
                    }
                })

            } else {
                const newTrack = await Track.create({ 
                    ...body,
                    file: {
                        id: videoResult.public_id,
                        url: videoResult.secure_url
                    },
                })

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: body.ownership },
                    { "$push": { tracks: newTrack.id } },
                    { new: true }
                )

                res.status(201).send({ 
                    status: 'OK', 
                    data: { 
                        newTrack, 
                        updatedUser 
                    }
                })
            }
            
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', error: err?.message })
        }
    },

    deleteOneTrack: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: 'FAILED',
                message: `${id} is an invalid ID`
            })
        }

        try {
            const findTrack = await Track.findById(id)
            const track = await Track.findByIdAndDelete(id)

            if (!findTrack || !track) {
                return res.status(404).send({
                    status: 'FAILED',
                    error: `Track ${id} was not found`
                })
            }

            if (track.file?.id) {
                await destroyImage(track.file.id)
            }

            if (track.img?.id) {
                await destroyImage(track.img.id)
            }

            res.status(204).send({ status: 'OK', data: updatedUser })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILED', error: err?.message })
        }
    },

    patchOneTrack: async (req, res) => {
        const { params: { id }, body, files } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: 'FAILED',
                message: `${id} is an invalid ID`
            })
        }

        try {
            if (!files) {
                await Track.findByIdAndUpdate(
                    { _id: id },
                    { ...body },
                    { new: true }
                )
            } else {
                const track = await Track.findById(id)

                if (!track) {
                    res.status(404).send({
                        status: 'FAILED',
                        message: `Track ${id} was not found`
                    })
                }

                if (files?.video) {
                    if (track.file?.id) {
                        await destroyImage(track.file.id)
                    }

                    const videoResult = await uploadTrack(files.video.tempFilePath)
                    await fs.unlink(files.video.tempFilePath)

                    await Track.findByIdAndUpdate(
                        { _id: id },
                        { 
                            ...body,
                            file: {
                                id: videoResult.public_id,
                                url: videoResult.secure_url
                            }
                        },
                        { new: true }
                    )
                }

                if (files?.image) {
                    if (track.img?.id) {
                        await destroyImage(track.img.id)
                    }

                    const imageResult = await uploadImage(files.image.tempFilePath)
                    await fs.unlink(files.image.tempFilePath)

                    await Track.findByIdAndUpdate(
                        { _id: id },
                        { 
                            ...body,
                            img: {
                                id: imageResult.public_id,
                                url: imageResult.secure_url
                            }
                        },
                        { new: true }
                    )
                }
            }

            res.status(201).send({ status: 'OK', data: `Track ${id} updated successfully` })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: 'FAILDED', error: err?.message })
        }
    }
}

module.exports = tracksController
