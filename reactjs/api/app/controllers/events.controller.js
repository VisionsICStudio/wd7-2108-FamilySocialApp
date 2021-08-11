/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable semi */
const { Events } = require('../models/Event') 

// CREATE METHOD

exports.createEvent = (req, res) => {
  // get the title and type values from the request body
  const { count, icon, lastPostAt, name } = req.body
  // create the item and save the new id
  const event = Events.create(name, icon, count, lastPostAt)
  // send the new id back to the request
  return res.json({ event })
}

// READ METHODS

// get all the events
exports.getAllEvents = (req, res) => {
  // run the find all function on the model
  const events = Events.findAll()
  // respond with json of the events array
  return res.json(events)
}
// get all the events with a type of public
exports.getEventsIcon = (req, res) => {
  // run the find all function on the events model
  const events = Events.findAll()
  // filter the events to only events who have a type of "public"
  const iconEvents = events.filter((event) => event.icon > 0)
  // respond with json of the public events array
  return res.json(iconEvents)
}

// find one event by id
exports.getOneEventById = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // search our events model for the event
  const event = Events.findByPk(id)
  // if no event is found
  if (!event) {
    // return a 404 (not found) code
    res.sendStatus(404)
    return
  }
  // if the event is found send it back
  res.json(event)
}

// UPDATE METHOD

// update an existing event
exports.updateEvent = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // Perform an update method on the events array in the Events model
  const updatedEvents = Events.update(req.body, id)
  // Return the updated events with a json response
  return res.json(updatedEvents)
}

// DELETE METHOD

// delete a event
exports.removeEvent = (req, res) => {
  // get the id from the route
  const { id } = req.params
  // remove the event
  Events.destroy(id)

  // send a good status code
  res.sendStatus(200)
}
