const mongoose = require("mongoose")
const { User } = require("../models")
const fs = require('fs-extra')
const {
    uploadImage, destroyImage
} = require("../utils/cloudinary")

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User
                .find({})
                .limit(10)
                .sort({ date: -1 })
                .populate("tracks")
                .populate("albums")
                .populate("playlists")
                .populate("favGenres")
                .populate("favPlaylists")
                .populate("favAlbums")
                .populate({
                    path: "favTracks",
                    populate: "ownership"
                })
                .populate("followers")
                .populate("following")
                .lean()

            if (users.length < 1) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                })
            }

            res.status(200).send(users)

        } catch (err) {
            res.status(400).send(err.message)
        }

    },
    getUserById: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }

        try {
            const user = await User
                .findById(id)
                .populate("tracks")
                .populate("albums")
                .populate("playlists")
                .populate("favGenres")
                .populate("favPlaylists")
                .populate("favAlbums")
                .populate({
                    path: "favTracks",
                    populate: "ownership"
                })
                .populate("followers")
                .populate("following")
                .lean()

            if (!user) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })
            }
            res.status(200).send(user)

        } catch (err) {
            res.status(400).send(err.message)
        }

    },
    postUser: async (req, res) => {
        const { body } = req

        if (!body.avatar) {
            body.avatar = "https://res.cloudinary.com/drghk9p6q/image/upload/v1674474842/Final-Project-MERN/images-orpheus/default-images/Untitled_design_tvsbzn.webp"
        }

        try {
            const user = await User.create({ ...body })
            res.status(201).send({
                status: "Created",
                data: user
            })
        } catch (err) {
            res.status(400).send(err.message)
        }

    },
    deleteUser: async (req, res) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `User ${id} is invalid`
            })
        }

        try {
            const user = await User.findByIdAndDelete(id)

            // Destroy user image from cloudinary
            if (user.img?.id) {
                await destroyImage(user.img.id)
            }

            if (!user) {
                res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })
            }
            res.status(200).send(user)

        } catch (err) {
            res.status(400).send(err)

        }

    },
    patchUser: async (req, res) => {
        const { params: { id }, body, files } = req



        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({
                status: "FALSE",
                message: `User ${id} is invalid`
            })
        }

        try {
            if (files?.image) {
                
                const user = await User.findById(id)
                if (!user) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `User ${id} was not found`
                    })
                }
                if (user.img.id) {

                    await destroyImage(user.img.id)
                }

                // If an image is uploaded we upload it to cloudinary and get the public_id and the URL
                const { public_id, secure_url } = await uploadImage(files.image.tempFilePath)
                await fs.unlink(files.image.tempFilePath)

                // Update user
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...body,
                        img: { id: public_id, url: secure_url }
                    },
                    { new: true }
                )

                res.status(201).send({
                    status: "OK",
                    message: `User ${id} updated successfully`,
                    data: updatedUser
                })

            } else {
                const user = await User.findByIdAndUpdate(
                    { _id: id },
                    { ...body },
                    { new: true }
                )

                if (!user) {
                    res.status(404).send({
                        status: "FALSE",
                        message: `User ${id} was not found`
                    })
                }

                res.status(201).send({
                    status: "OK",
                    message: `User ${id} updated successfully`
                })
            }

        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = {
    getAllUsers: userController.getAllUsers,
    getUserById: userController.getUserById,
    postUser: userController.postUser,
    deleteUser: userController.deleteUser,
    patchUser: userController.patchUser
}