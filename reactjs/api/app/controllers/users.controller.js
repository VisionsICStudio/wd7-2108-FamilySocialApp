/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable semi */
const { Users } = require('../models/User')

// CREATE

// add a new decision
exports.createUser = (req, res) => {
  // get the title and type values from the request body
  const { avatar, city, role, state, username } = req.body
  // create the item and save the new id
  const user = Users.create(username, avatar, city, state, role)
  // send the new id back to the request
  return res.json({ user })
}

// READ

// get all the users
exports.getAll = (req, res) => {
  // run the find all function on the users model
  const users = Users.findAll()
  // respond with json of the users array
  return res.json(users)
}
// get all the users with a type of public
exports.getAdmin = (req, res) => {
  // run the find all function on the users model
  const users = Users.findAll()
  // filter the decisions to only users who have a type of "public"
  const adminUsers = users.filter((user) => user.role === 'admin')
  // respond with json of the public users array
  res.json(adminUsers)
}

// find one user by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // search our user model for the user
  const user = Users.findByPk(id)
  // if no user is found
  if (!user) {
    // return a 404 (not found) code
    res.sendStatus(404)
    return
  }
  // if the user is found send it back
  res.json(user)
}

// UPDATE

// update an existing post
exports.updateUser = (req, res) => {
  const { id } = req.params
  const updatedUsers = Users.update(req.body, id)

  return res.json(updatedUsers)
}

// DELETE

// delete a user
exports.removeUser = (req, res) => {
  // get the id from the route
  const { id } = req.params
  // remove the user
  Users.destroy(id)
  // send a good status code
  res.sendStatus(200)
}
