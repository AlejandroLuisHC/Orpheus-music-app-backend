const express = require("express")
const{
    getAllEvents,
    getEventById,
    postEvent,
    patchEvent,
    deleteEvent
} = require("../../controllers/events.controller")
const { checkJwt } = require("../../middlewares/checkJwt.middleware")
const router = express.Router()
router
    .get("/", checkJwt, getAllEvents)
    .get("/:id", checkJwt, getEventById)
    .post("/", checkJwt, postEvent)
    .patch("/:id", checkJwt, patchEvent)
    .delete("/:id", checkJwt, deleteEvent)

module.exports = router;
    