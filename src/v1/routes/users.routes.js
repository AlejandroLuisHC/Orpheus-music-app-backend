const express = require("express")
const {
    getAllUsers,
    getUserById,
    getUserByEmail,
    postUser,
    deleteUser,
    patchUser
} = require("../../controllers/users.controller")

const router = express.Router()
router
    .get("/", getAllUsers)
    .get("/email_search", getUserByEmail)
    .get("/id_search/:id", getUserById)
    .post("/", postUser)
    .delete("/:id", deleteUser)
    .patch("/:id", patchUser)

module.exports = router;