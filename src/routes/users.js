const express = require('express')
const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/user')
const { verifyToken } = require('../utils/verifyToken')

const router = new express.Router()

//update user
router.put('/:id', verifyToken, updateUser)

//delete user
router.delete('/:id', verifyToken, deleteUser)

//get user
router.get('/:id', verifyToken, getUser)

//get all users
router.get('/', verifyToken, getUsers)


module.exports = router