const express = require('express')
const router = express.Router()

// const fileUpload = require("express-fileupload")
const { checkJwt } = require('../../middlewares/checkJwt.middleware')

const {
    getAllTracks,
    getOneTrack,
    postNewTrack,
    deleteOneTrack,
    patchOneTrack
} = require('../../controllers/tracks.controller')

router
    .get('/',        checkJwt,  getAllTracks)
    .get('/:id',     checkJwt,  getOneTrack)
    .post('/',       checkJwt,  postNewTrack)
    .delete('/:id',  checkJwt,  deleteOneTrack)
    .patch('/:id',   checkJwt,  patchOneTrack)

module.exports = router