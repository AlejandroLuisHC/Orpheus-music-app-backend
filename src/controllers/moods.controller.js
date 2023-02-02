const { Mood } = require("../models")

const moodsController = {
    getAllMoods: async (req, res) => {
        try {
            const moods = await Mood.find({}).lean()

            if (moods.length < 1) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                })
            }
            res.status(200).send(moods)

        } catch (error) {
            res.status(400).send(error)
        }

    },
    postMood: async (req, res) => {
        const { body } = req

        try {
            const moodExists = await Mood.findOne({ name: body.name })
            if (moodExists) {
                return res.status(400).send({
                    status: "false",
                    message: "Mood already stored in the DB"
                })
            }
            const mood = await Mood.create({ ...body },
                { new: true })
            res.status(201).send({
                status: "Created",
                data: mood
            })

        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = {
    getAllMoods: moodsController.getAllMoods,
    postMood: moodsController.postMood
}

