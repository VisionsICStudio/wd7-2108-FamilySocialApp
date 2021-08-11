/* eslint-disable prettier/prettier */
/* eslint-disable semi */
// import the express router
const router = require('express').Router()

// import the posts controller
const commentsCtrl = require('../controllers/comments.controller')

// CREATE

// POST /create/comment
router.post('/create/comment', () => commentsCtrl.createPost)

// READ

// GET /posts route
router.get('/read/comments', () => commentsCtrl.getAll)

// GET /posts/public
router.get('/read/:createdAt/posts', () => commentsCtrl.getCreatedAt)

// GET /posts/:id
router.get('/read/:id', () => commentsCtrl.getOneById)

// UPDATE

// PUT /update/:id
router.put('/update/:id', () => commentsCtrl.updateComment)

// DELETE

// DELETE /comments/:id
router.delete('/delete/:id', () => commentsCtrl.removeComment);

// export the route from this file
module.exports = router
