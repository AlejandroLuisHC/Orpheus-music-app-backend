const mongoose = require("mongoose")
const { User } = require("../models")

const userController = {
    getAllUsers: async(req, res) => {
        try {
            const users = await User.find({})

            if (users.length < 1) {
                return res.status(404).send({
                    status: "FALSE",
                    message: `The DB is currently empty`
                })
            }

            res.status(200).send(users)
            
        } catch (err) {
            res.status(400).send(err)
            
        }
         
    },
    getUserById: async(req, res) => {
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
            
        } catch (err) {
            res.status(400).send(err)
            
        }
        
    },
    
    postUser: async(req, res) => {
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
              
        } catch (err) {
            res.status(400).send(err.message)
            
        }
        
    },
    deleteUser: async(req, res) => {
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
                
            }

            res.status(200).send(user)
              
        } catch (err) {
            res.status(400).send(err)
            
        }
        
    },
    patchUser: async(req, res) => {
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
                
            }
            res.status(201).send({
                status: "OK",
                message: `User ${id} updated successfully`
            })
              
        } catch (err) {
            res.status(400).send(err)
            
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