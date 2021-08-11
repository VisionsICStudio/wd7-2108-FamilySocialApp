/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable semi */
const { Posts } = require('../models/Post')

// CREATE METHOD

// add a new post
exports.createPost = (req, res) => {
  // get all the appropriate values from the request body
  const { commentCount, content, createdAt, title, totalVotes } = req.body
  // create the post and save the new id
  const post = Posts.create(
    title,
    content,
    createdAt,
    totalVotes,
    commentCount
  )
  // send the new id back to the request
  return res.json({ post })
}

// READ METHODS

// get all the posts
exports.getAll = (req, res) => {
  // run the find all function on the posts model
  const posts = Posts.findAll()
  // respond with json of the posts array
  return res.json(posts)
}
// get all the posts with a type of public
exports.getVotedPosts = (req, res) => {
  // run the find all function on the posts model
  const posts = Posts.findAll()
  // filter the posts to only posts who have a type of "public"
  const votedPosts = posts.filter((post) => post.totalVotes > 0)
  // respond with json of the public posts array
  return res.json(votedPosts)
}

// find one post by id
exports.getOneById = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // search our post model for the post
  const post = Posts.findByPk(id)
  // if no post is found
  if (!post) {
    // return a 404 (not found) code
    res.sendStatus(404)
    return
  }
  // if the post is found send it back
  res.json(post)
}

// UPDATE METHOD

// update an existing post
exports.updatePost = (req, res) => {
  // get the id from the route params
  const { id } = req.params
  // Perform an update method on the posts array in the Posts model
  const updatedPosts = Posts.update(req.body, id)
  // Return the updated posts with a json response
  return res.json(updatedPosts);
}

// DELETE METHOD

// delete a comment
exports.removePost = (req, res) => {
  // get the id from the route
  const { id } = req.params
  // remove the comment
  Posts.destroy(id)

  // send a good status code
  res.sendStatus(200)
}
