const { Genre } = require("../models")

const genresController = {
    getAllGenres: async (req, res) => {
        try {
            const genres = await Genre.find({}).lean()

            if (genres.length < 1) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                })
            }
            res.status(200).send(genres)

        } catch (error) {
            res.status(400).send(error)
        }

    },
    postGenre: async (req, res) => {
        const { body } = req

        try {
            const genreExists = await Genre.findOne({ name: body.name })
            if (genreExists) {
                return res.status(400).send({
                    status: "false",
                    message: "Genre already stored in the DB"
                })
            }
            const genre = await Genre.create({ ...body },
                { new: true })
            res.status(201).send({
                status: "Created",
                data: genre
            })

        } catch (err) {
            res.status(400).send(err.message)

        }
    }
}

module.exports = {
    getAllGenres: genresController.getAllGenres,
    postGenre: genresController.postGenre
}

