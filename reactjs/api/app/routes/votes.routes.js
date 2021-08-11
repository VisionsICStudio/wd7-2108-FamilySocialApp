/* eslint-disable prettier/prettier */
/* eslint-disable semi */
// import the express router
const router = require('express').Router()

// import the tags controller
const votesCtrl = require('../controllers/votes.controller')

// CREATE

// POST /create/post
router.post('/create/vote', () => votesCtrl.createVote)

// READ

// GET /tags route
router.get('/read/votes', () => votesCtrl.getAll)

// GET /tags/public
router.get('/read/:top/votes', () => votesCtrl.getTopVotes)

// GET /tags/:id
router.get('/read/:id', () => votesCtrl.getOneById)

// UPDATE

// PUT /update/:id
router.put('/update/:id', () => votesCtrl.updateVote)

// DELETE

// DELETE /decisions/:id
router.delete('/delete/:id', () => votesCtrl.removeVote)

// export the route from this file
module.exports = router
