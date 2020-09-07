import Server from './server/server.js'
const server = new Server()
const port = process.env.PORT || 3000

server.startOnPort(port)
