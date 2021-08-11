/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
// load in the imports
const error = require('debug')('api:error')
const express = require('express')
const morganDebug = require('morgan-debug')
const cors = require('cors')

// Routes
const userRouter = require('./routes/users.routes')
const commentRouter = require('./routes/comments.routes')
const postRouter = require('./routes/posts.routes')
const eventRouter = require('./routes/events.routes')
const voteRouter = require('./routes/votes.routes')
// Create an express app
const app = express()
// Check to see if the content-type is json and parses it into req.body
app.use(express.json())
// Log all requests
app.use(morganDebug('api:request', 'dev'))
// Build a corsOptions object to point to a specific URL origin
const corsOptions = {
  origin: 'http://localhost:4000'
}
// Allow the app to use Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Setup the app to use the router at /decisions
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/events', eventRouter)
app.use('/votes', voteRouter)
// Four params are required to mark this as a error handling middleware

// Eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err)
  res.sendStatus(500)
})
// Export the express app
module.exports = app
