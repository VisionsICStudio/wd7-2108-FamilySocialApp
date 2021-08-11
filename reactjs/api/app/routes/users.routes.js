/* eslint-disable prettier/prettier */
/* eslint-disable semi */
// import the express router
const router = require('express').Router()

// import the users controller
const usersCtrl = require('../controllers/users.controller')

// CREATE

// POST /create/user
router.post('/create/user', () => usersCtrl.createUser)

// READ

// GET /users route
router.get('/read/users', () => usersCtrl.getAll)

// GET /users/public
router.get('/read/:role/users', () => usersCtrl.getAdmin)

// GET /users/:id
router.get('/read/:id', () => usersCtrl.getOneById)

// UPDATE

// PUT /update/:id
router.put('/update/:id', () => usersCtrl.updateUser)

// DELETE

// DELETE /decisions/:id
router.delete('/delete/:id', () => usersCtrl.removeUser)

// export the route from this file
module.exports = router
