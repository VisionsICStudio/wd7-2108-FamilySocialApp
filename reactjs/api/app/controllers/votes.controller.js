/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable semi */
const { Votes } = require('../models/Vote')

// CREATE METHOD

exports.createTag = (req, res) => {
  // get the title and type values from the request body
  const { lastVoteAt, userId, vote } = req.body
  // create the item and save the new id
  const votes = Votes.create(vote, userId, lastVoteAt)
  // send the new id back to the request
  return res.json({ votes })
}

// READ METHODS

// get all the tags
exports.getAll = (req, res) => {
  // run the find all function on the model
  const votes = Votes.findAll()
  // respond with json of the tags array
  return res.json(votes)
}
// get all the tags with a type of public
exports.getTopVotes = (req, res) => {
  // run the find all function on the tags model
  const votes = Votes.findAll()
  // filter the tags to only tags who have a type of "public"
  const topVotes = votes.filter((vote) => vote.vote > 0)
  // respond with json of the public tags array
  return res.json(topVotes)
}

// find one tag by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // search our tags model for the tag
  const vote = Votes.findByPk(id)
  // if no tag is found
  if (!vote) {
    // return a 404 (not found) code
    res.sendStatus(404)
    return;
  }
  // if the tag is found send it back
  res.json(vote)
}

// UPDATE METHOD

// update an existing tag
exports.updateVote = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // Perform an update method on the tags array in the Tags model
  const updatedVotes = Votes.update(req.body, id)
  // Return the updated tags with a json response
  return res.json(updatedVotes)
}

// DELETE METHOD

// delete a tag
exports.removeVote = (req, res) => {
  // get the id from the route
  const { id } = req.params
  // remove the tag
  Votes.destroy(id)

  // send a good status code
  res.sendStatus(200)
}
