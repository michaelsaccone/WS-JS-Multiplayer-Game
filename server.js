
import express from 'express'
import http, { createServer } from 'http'

import { Server } from 'socket.io'

const app = express()

const server = http.createServer(app)

app.use(express.static('client'))

const io = new Server(server);

server.listen(3000);

const players = {}

io.on('connect', (socket) => {
	console.log('connesso ' + socket.handshake.address)
	players[socket.id] = socket;

	for(let k in players) socket.emit('spawn', { id: k })

	socket.broadcast.emit('spawn', { id: socket.id })

	socket.on('move', (data) => {
		data.id = socket.id;
		socket.broadcast.emit('update', data)
	})

	socket.on('disconnect', () => {
		socket.broadcast.emit('despawn', { id: socket.id })
		delete players[socket.id]
	})
})