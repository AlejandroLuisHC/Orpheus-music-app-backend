const express = require('express')
const router = express.Router()

const checkJwt = require('../../middlewares/checkJwt.middleware')

const {
    getAllTracks,
    getOneTrack,
    postNewTrack,
    deleteOneTrack,
    patchOneTrack
} = require('../../controllers/tracks.controller')

router
    .get('/', getAllTracks)
    .get('/:id', /* checkJwt, */ getOneTrack)
    .post('/', postNewTrack)
    .delete('/:id', /* checkJwt, */ deleteOneTrack)
    .patch('/:id', /* checkJwt, */ patchOneTrack)

module.exports = router