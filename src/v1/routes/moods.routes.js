const express = require("express")
const {
    getAllMoods,
    postMood
} = require("../../controllers/moods.controller");
const { checkJwt } = require("../../middlewares/checkJwt.middleware");

const router = express.Router()
router
    .get("/",   checkJwt, getAllMoods)
    .post("/",  checkJwt, postMood)
    
module.exports = router;