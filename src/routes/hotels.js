const express = require('express')
const Hotel = require('../models/hotel')

const router = new express.Router()

//create Hotel
router.post('/', async (req, res) => {
    console.log('bodyyyy', req.body)
    const hotel = new Hotel(req.body)
    try {
        await hotel.save()
        res.status(201).send(hotel)
    } catch (e) {
        res.status(500).send({ e: e.message })
    }
})

//update hotel
router.put('/:id', async (req, res) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updateHotel)
    } catch (e) {
        res.status(500).send({ e: e.message })
    }
})

//delete hotel
router.delete('/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send('The Hotel has been deleted!')
    } catch (e) {
        res.status(500).send({ e: e.message })
    }
})

//get hotel
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        if(!hotel){
            throw new Error('hotel not found!')
        }
        res.status(200).send(hotel)
    } catch (e) {
        res.status(500).send({ e: e.message })
    }
})

//get all hotels
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).send(hotels)
    } catch (e) {
        res.status(500).send({ e: e.message })
    }
})

module.exports = router