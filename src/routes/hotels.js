const express = require('express')
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require('../controllers/hotel')

const router = new express.Router()

//create Hotel
router.post('/', createHotel)

//update hotel
router.put('/:id', updateHotel)

//delete hotel
router.delete('/:id', deleteHotel)

//get hotel
router.get('/:id', getHotel)

//get all hotels
router.get('/', getHotels)

module.exports = router