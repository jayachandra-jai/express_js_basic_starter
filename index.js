const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const http = require('http')
const mainConfig = require('./config/mainConfig')
const logger = require('./app/libs/loggerLib')
const customCors = require('./app/middlewares/custom-cors');
const globalErrorMiddleware = require('./app/middlewares/appErrorHandler')
const mongoose = require('mongoose');
const helmet = require('helmet');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(customCors.logIpAndDoCors)
app.use(globalErrorMiddleware.globalErrorHandler)
app.use(helmet())
// application component paths

const modelsPath = './app/models'
const controllersPath = './app/controllers'
const libsPath = './app/libs'
const middlewaresPath = './app/middlewares'
const routesPath = './app/routes'

// Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) require(modelsPath + '/' + file)
})
// end Bootstrap models

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf('.js')) {
    let route = require(routesPath + '/' + file)
    route.setRouter(app)
  }
})
// end bootstrap route

// calling global 404 handler after route

app.use(globalErrorMiddleware.globalNotFoundHandler);

// end global 404 handler

/**
 * Create HTTP server.
 */

const server = http.createServer(app)
// start listening to http server
console.log(mainConfig)
server.listen(mainConfig.port)
server.on('error', onError)
server.on('listening', onListening)

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
    throw error
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
      process.exit(1)
      break
    default:
      logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  ('Listening on ' + bind)
  logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
  global.db = mongoose.connect(mainConfig.db.uri, mainConfig.mongoOpt)
  
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
  console.log('database connection error')
  console.log(err)
  logger.error(err,
      'mongoose connection on error handler', 10)
    // process.exit(1)
}) // end mongoose connection error

mongoose.connection.on('open', (err) => {
  if (err) {
    console.log('database error')
    console.log(err)
    logger.error(err, 'mongoose connection open handler', 10)
  } else {
    console.log('database connection open success')
    logger.info('database connection open',
      'database connection open handler', 10)
  }
  // process.exit(1)
}) // enr mongoose connection open handler


module.exports = app
