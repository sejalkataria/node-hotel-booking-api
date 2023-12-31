const express = require('express')
const { verifyToken } = require('../utils/verifyToken')
const { createRoom, updateRoom, deleteRoom, getRoom, getRooms, bookRoom } = require('../controllers/room')

const router = new express.Router()

//create room
router.post('/:hotelid', verifyToken, createRoom)

//update room
router.put('/:id', verifyToken, updateRoom)

//delete room
router.delete('/:hotelid/:id', verifyToken, deleteRoom)

//get room by id
router.get('/:id', getRoom)

//get all rooms
router.get('/', getRooms)

//book room
router.post('/book/:id',verifyToken, bookRoom)

module.exports = router