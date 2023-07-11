const express = require('express')
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels, getHotelRooms } = require('../controllers/hotel')
const { verifyToken } = require('../utils/verifyToken')

const router = new express.Router()

//create Hotel
router.post('/', verifyToken, createHotel)

//update hotel
router.put('/:id', verifyToken, updateHotel)

//delete hotel
router.delete('/:id', verifyToken, deleteHotel)

//get hotel
router.get('/:id', getHotel)

//get all hotels
router.get('/', getHotels)

//get hotel rooms
router.get('/rooms/:hotelid', getHotelRooms)

module.exports = router