/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable semi */
const { Comments } = require('../models/Comment')

// CREATE METHOD

// add a new comment
exports.createPost = (req, res) => {
  // get the title and type values from the request body
  const { content, createdAt } = req.body
  // create the item and save the new id
  const comment = Comments.create(content, createdAt)
  // send the new id back to the request
  return res.json({ comment })
}

// READ METHODS

// get all the comments
exports.getAll = (req, res) => {
  // run the find all function on the comments model
  const comments = Comments.findAll()
  // respond with json of the comments array
  return res.json(comments)
}
// get all the comments with a createdAt of blank
exports.getCreatedAt = (req, res) => {
  // run the find all function on the comments model
  const comments = Comments.findAll()
  // filter the comments to only posts who have a type of "createdAt"
  const createdAtComments = comments.filter(
    (comment) => comment.createdAt === ''
  )
  // respond with json of the createdAt comments array
  return res.json(createdAtComments)
}

// find one comment by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // search our comment model for the comment
  const comment = Comments.findByPk(id)
  // if no comment is found
  if (!comment) {
    // return a 404 (not found) code
    res.sendStatus(404)
    return;
  }
  // if the post is found send it back
  res.json(comment)
}

// UPDATE METHOD

// update an existing comment
exports.updateComment = (req, res) => {
  const { id } = req.params
  const updatedComments = Comments.update(req.body, id)
  return res.json(updatedComments)
}

// DELETE METHOD

// delete a comment
exports.removeComment = (req, res) => {
  // get the id from the route
  const { id } = req.params
  // remove the comment
  Comments.destroy(id)

  // send a good status code
  res.sendStatus(200)
}
