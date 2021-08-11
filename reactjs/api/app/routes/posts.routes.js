/* eslint-disable prettier/prettier */

// import the express router
const router = require('express').Router()

// import the posts controller
const postsCtrl = require('../controllers/posts.controller')
// CREATE
// POST /create/post
router.post('/create/post', () => postsCtrl.createPost)
// READ
// GET /posts route
router.get('/read/posts', () => postsCtrl.getAll)

// GET /posts/public
router.get('/read/:totalVotes/posts', () => postsCtrl.getVotedPosts)

// GET /posts/:id
router.get('/read/:id', () => postsCtrl.getOneById)

// UPDATE

// PUT /update/:id
router.put('/update/:id', () => postsCtrl.updatePost)

// DELETE

// DELETE /decisions/:id
router.delete('/delete/:id', () => postsCtrl.removePost)

// export the route from this file
module.exports = router
