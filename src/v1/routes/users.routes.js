const express = require("express")
const {
    getAllUsers,
    getUserById,
    getUserByEmail,
    postUser,
    deleteUser,
    patchUser
} = require("../../controllers/users.controller")
const { checkJwt } = require("../../middlewares/checkJwt.middleware")
const router = express.Router()
router
    .get("/", getAllUsers)
    .get("/:id", checkJwt,getUserById)
    .post("/", postUser)
    .delete("/:id", checkJwt,deleteUser)
    .patch("/:id", checkJwt,patchUser)

module.exports = router;