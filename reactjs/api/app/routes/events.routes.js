/* eslint-disable prettier/prettier */
/* eslint-disable semi */
// import the express router
const router = require('express').Router()

// import the events controller
const eventsCtrl = require('../controllers/events.controller')

// CREATE

// POST /create/event
router.post('/create/event', () => eventsCtrl.createEvent)

// READ

// GET /events route
router.get('/read/events', () => eventsCtrl.getAllEvents)

// GET /events/public
router.get('/read/events/:icon', () => eventsCtrl.getEventsIcon)

// GET /event/:id
router.get('/read/event/:id', () => eventsCtrl.getOneEventById)

// UPDATE

// PUT /update/event/:id
router.put('/update/event/:id', () => eventsCtrl.updateEvent)

// DELETE

// DELETE /delete/:id
router.delete('/delete/event/:id', () => eventsCtrl.removeEvent);

// export the route from this file
module.exports = router
