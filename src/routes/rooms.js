const express = require('express')
const { verifyToken } = require('../utils/verifyToken')
const { createRoom, updateRoom, deleteRoom } = require('../controllers/room')

const router = new express.Router()

//create room
router.post('/:hotelid', verifyToken, createRoom)

//update room
router.put('/:id', verifyToken, updateRoom)

//delete room
router.delete('/:hotelid/:id', verifyToken, deleteRoom)

module.exports = router