const User = require('../models/user')
const createError = require('../utils/error')
const bcrypt = require('bcryptjs')


const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(201).send(newUser)
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404, 'user not found!'))
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return next(createError(400, 'Password does not ,atch'))
        }
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }
}

module.exports = { register, login }