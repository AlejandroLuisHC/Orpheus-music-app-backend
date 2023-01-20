const mongoose = require("mongoose")
const { Event } = require("../models")

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
        const { body } = req

        try {
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

        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    patchEvent: async (req, res) => {
        const { params: { id }, body } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `Event ${id} is invalid`
            })
        }

        try {
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

        } catch (err) {
            res.status(400).send(err)
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