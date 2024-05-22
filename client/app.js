
const socket = io();
let posX = 0
let posY = 0
let vX = 0
let vY = 0
const players = {}

function trackMouse(event) {
	let t = document.getElementById('player')
	vX = posX - event.clientX
	vY = posY - event.clientY
	posX += vX
	posY += vY
	t.style.left = posX + "px"
	t.style.top = posY + "px"
	socket.emit('move', { x: posX, y: posY })
}

socket.on('spawn', (data) => {
	players[data.id] = document.createElement('div');
	players[data.id].classList.add('giocatore');
	document.body.appendChild(players[data.id]);
})

socket.on('update', (data) => {
	players[data.id].style.left = data.x - 50+ 'px';
	players[data.id].style.top = data.y - 50 + 'px';
})

socket.on('despawn', (data) => {
	document.body.removeChild(players[data.id])
	delete players[data.id];
})
window.onmousemove = trackMouse;