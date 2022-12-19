
const rout = require('express').Router()
const { createPost, updatePost, deletePost, getPost, getPosts } =  require('../controller/postController')
const {verifyUser} = require('../middleware/verifyToken')

// const {protect} = require('../middleware/authMiddleware')

rout.post('/:id',verifyUser, createPost)
rout.get('/all', getPosts)
rout.get('/:id', getPost)
rout.put('/:id',verifyUser,  updatePost)
rout.delete('/:id/:_id',verifyUser, deletePost)

// router.post('/me',protect ,getMe)

module.exports = rout