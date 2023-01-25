const express = require("express")
const {
    getAllUsers,
    getUserById,
    postUser,
    deleteUser,
    patchUser
} = require("../../controllers/users.controller")
const { checkJwt } = require("../../middlewares/checkJwt.middleware")

const router = express.Router()
router
    .get("/",                 getAllUsers)
    .get("/:id",    getUserById)
    .post("/",                postUser)
    .delete("/:id", checkJwt, deleteUser)
    .patch("/:id",  patchUser)

module.exports = router;