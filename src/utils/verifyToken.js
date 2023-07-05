const jwt = require('jsonwebtoken')
const { createError } = require('./error')
const User = require('../models/user')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            return next(createError(401, 'please authentictae'))
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const foundUser = await User.findOne({ _id: decode._id })
        if (!foundUser) {
            throw new Error('token not verified')
        }
        req.user = foundUser
        next()
    }
    catch (e) {
        next(e)
    }
}

module.exports = { verifyToken }