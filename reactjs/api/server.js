/* eslint-disable prettier/prettier */
// setting up a logger
const log = require('debug')('api:logging')
// get the express application
const app = require('./app')
// set the port to either the one passed from the environment variables or
const port = process.env.PORT || 4000
// spin up the server and log what port it is running on
app.listen(port, () => log(`API listening on port ${port}!`))
