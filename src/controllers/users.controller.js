const mongoose = require("mongoose")
const { User } = require("../models")

const userController = {
    getAllUsers: async(req, res, next) => {
        try {
            const users = await User.find({})

            if (users.length < 1) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                })
            }

            res.status(200).send(users)
            next()
        } catch (err) {
            res.status(400).send(err)
            next()
        }
        next() 
    },
    getUserById: async(req, res, next) => {
        const { params: { id } } = req

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                status: "FALSE",
                message: `${id} is an invalid ID`
            })
        }

        try {
            const user = await User.findById(id)
            
            if (!user) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })
            }

            res.status(200).send(user)
            next()
        } catch (err) {
            res.status(400).send(err)
            next()
        }
        next()
    },
    getUserByEmail: async(req, res, next) => {
        const { body } = req
        if (body) {
            try {
                const user = await User.findOne({email: body.email})
                
                if (user.length < 1) {
                    return res.status(404).send({
                        status: "FALSE",
                        message: `User ${email} was not found`
                    })
                }
    
                res.status(200).send(user)
                next()
            } catch (err) {
                res.status(400).send(err)
                next()
            }
            next()
        }
    },
    postUser: async(req, res, next) => {
        const { body } = req
        
        try {
            const userExists = await User.findOne({ email: body.email }) // Get to userData.email
            if(userExists) {
                return res.status(400).send({
                    status: "false",
                    message: "User already stored in the DB"
                })
            }
            const user = await User.create({ ...body })
            res.status(201).send({
                status: "Created",
                data: user
            })
            next()  
        } catch (err) {
            res.status(400).send(err.message)
            next()
        }
        next()
    },
    deleteUser: async(req, res, next) => {
        const { params: { id }} = req
        
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                status: "FALSE",
                message: `User ${id} is invalid`
            })
        }

        try {
            const user = await User.findByIdAndDelete(id)

            if (!user) {
                res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })
                next()
            }

            res.status(200).send(user)
            next()  
        } catch (err) {
            res.status(400).send(err)
            next()
        }
        next()
    },
    patchUser: async(req, res, next) => {
        const { params: { id }, body } = req
        
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                status: "FALSE",
                message: `User ${id} is invalid`
            })
        }

        try {
            const user = await User.findByIdAndUpdate(
                { _id: id }, 
                { ...body }
            )
            
            if (!user) {
                res.status(404).send({
                    status: "FALSE",
                    message: `User ${id} was not found`
                })
                next()
            }
            res.status(201).send({
                status: "OK",
                message: `User ${id} updated successfully`
            })
            next()  
        } catch (err) {
            res.status(400).send(err)
            next()
        }
        next()
    }
}

module.exports = {
    getAllUsers: userController.getAllUsers,
    getUserById: userController.getUserById,
    getUserByEmail: userController.getUserByEmail,
    postUser: userController.postUser,
    deleteUser: userController.deleteUser,
    patchUser: userController.patchUser
}