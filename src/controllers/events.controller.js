const mongoose = require("mongoose")
const { Event } = require("../models")
const { uploadImage, destroyImage } = require("../utils/cloudinary")
const fs = require("fs-extra")

const eventController = {

    getAllEvents: async (req, res) => {
        try {
            const events = await Event
                .find({})
                .populate("genres")
                .populate("artists")
                .lean()

            if (events.length < 1) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                })
            }
            res.status(200).send(events)

        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    getEventById: async (req, res) => {
        const { body, params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }
        try {
            const event = await Event
                .findById(id)
                .populate("genres")
                .populate("artists")
                .lean()

            if (!event) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `Event ${id} was not found`
                })
            }
            res.status(200).send(event)

        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    postEvent: async (req, res) => {
        const { body, files } = req

        try {
            if (files.image) {
                //Cloudinary upload img
                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)
                await fs.unlink(files.image.tempFilePath)

                const event = await Event.create({ 
                    ...body, 
                    img: {
                        id: public_id,
                        url: secure_url
                    }
                })

                res.status(201).send({
                    status: "Created",
                    data: event
                }) 

            } else {
                const eventExists = await Event.findOne({ name: body.name })
                if (eventExists) {
                    return res.status(400).send({
                        status: "false",
                        message: "Event already stored in the DB"
                    })
                }

                const event = await Event.create({ ...body })
                res.status(201).send({
                    status: "Created",
                    data: event
                })
            }
        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    patchEvent: async (req, res) => {
        const { params: { id }, body, files } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `Event ${id} is invalid`
            })
        }

        try {
            if (files?.image) {
                //Destroy prev. image  from Cloudinary
                const event = await Event.findById(id)
                if (!event) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Event image ${id} was not found`
                    })
                }
                if (event.img.id) {
                    await destroyImage(event.img.id)
                }
                //Cloudinary upload img
                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)
                await fs.unlink(files.image.tempFilePath)

                await Event.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        img: { id: public_id, url: secure_url }
                    }
                )
                res.status(201).send({
                    status: "OK",
                    message: `Event ${id} updated successfully`
                })

            } else {

                const event = await Event.findByIdAndUpdate(
                    { _id: id },
                    { ...body }
                )

                if (!event) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `Event ${id} was not found`
                    })
                }
                res.status(201).send({
                    status: "OK",
                    message: `Event ${id} updated successfully`
                })
            }
        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    deleteEvent: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `Event ${id} is invalid`
            })
        }

        try {
            const event = await Event.findByIdAndDelete(id)

            if (event.img?.id) {
                await destroy
            }

            if (!event) {
                res.status(404).send({
                    status: "FALSE",
                    message: `Event ${id} was not found`
                })
            }

            res.status(200).send(event)

        } catch (err) {
            res.status(400).send(err)
        }
    },
}

module.exports = {
    getAllEvents: eventController.getAllEvents,
    getEventById: eventController.getEventById,
    postEvent: eventController.postEvent,
    deleteEvent: eventController.deleteEvent,
    patchEvent: eventController.patchEvent
}