const User = require('../models/user')

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('The User has been deleted!')
    } catch (e) {
        next(e)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            throw new Error('user not found!')
        }
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (e) {
        next(e)
    }
}

module.exports = { updateUser, deleteUser, getUser, getUsers }