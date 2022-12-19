
const rout = require('express').Router()
const {register, login, updateUser, deleteUser, getUser, getUsers} =  require('../controller/authController')
const {verifyAdmin, verifyUser} = require('../middleware/verifyToken')


rout.post('/register', register)
rout.post('/login', login)


rout.get('/:id',verifyUser, getUser)
rout.get('/',verifyAdmin, getUsers)
rout.put('/:id',verifyUser, updateUser)
rout.delete('/:id' ,verifyUser,  deleteUser)

module.exports = rout