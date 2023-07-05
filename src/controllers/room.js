const Room = require('../models/room')
const Hotel = require('../models/hotel')
const { createError } = require('../utils/error')

const createRoom = async (req, res, next) => {
    const user = req.user
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)
    if (!user.isAdmin) {
        return next(createError(403, 'unAuthorized!'))
    }
    try {
        const foundHotel = await Hotel.findById(hotelId)
        if (!foundHotel) {
            return next(createError(404, 'Hotel not found!'))
        }
        const saveRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: saveRoom._id } })
        }
        catch (e) {
            next(e)
        }
        res.status(201).send(saveRoom)
    } catch (e) {
        next(e)
    }

}

const updateRoom = async (req, res, next) => {
    const user = req.user
    const roomId = req.params.id
    if (!user.isAdmin) {
        return next(createError(403, 'unAuthorized!'))
    }
    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomId, { $set: req.body }, { new: true })
        if (!updatedRoom) {
            return next(createError(404, 'Room not found'))
        }
        res.status(200).send(updatedRoom)
    } catch (e) {
        next(e)
    }

}

const deleteRoom = async (req, res, next) => {
    const user = req.user
    const hotelId = req.params.hotelid
    const roomId = req.params.id
    if (!user.isAdmin) {
        return next(createError(404, 'unAuthorized!'))
    }
    try {
        const deleteRoom = await Room.findByIdAndDelete(roomId)
        if (!deleteRoom) {
            return next(createError(404, 'Room not found!'))
        }
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } })
        } catch (e) {
            next(e)
        }
        res.status(200).send('The room has been deleted')
    } catch (e) {
        next(e)
    }
}

module.exports = { createRoom, updateRoom, deleteRoom }