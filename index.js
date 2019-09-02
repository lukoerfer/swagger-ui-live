const fs = require('fs')
const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cheerio = require('cheerio')

const swaggerUI = require('swagger-ui-dist').absolutePath()
const swaggerLive = path.join(path.resolve(__dirname), 'dist')

function index () {
  const $ = cheerio.load(fs.readFileSync(swaggerUI + '/index.html'))
  $('script').last().remove()
  $('body').append('<script src="./socket.io/socket.io.js"> </script>')
  $('body').append('<script src="./swagger-ui-live.js"> </script>')
  return $.html()
}

module.exports = function (spec, options = {}) {
  options.port = options.port || 3000
  options.host = options.host || '127.0.0.1'

  const app = express()
  app.get('/', (req, res) => res.send(index()))
  app.use(express.static(swaggerUI, { index: false }))
  app.use(express.static(swaggerLive))
  const server = http.createServer(app)
  const io = socketio(server)

  io.on('connection', socket => {
    socket.on('ready', data => {
      socket.emit('update', spec)
    })
  })

  server.listen(options.port, options.host)

  return {
    update: function (value) {
      spec = value
      io.sockets.emit('update', spec)
    },
    stop: function () {
      server.stop()
    }
  }
}
