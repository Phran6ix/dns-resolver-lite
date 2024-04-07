import * as dgram from 'dgram'

const server = dgram.createSocket("udp4")

console.log("Ggd")
server.on("connect", () => {
	console.log("Connection Established")
})

server.on("listening", () => {
	console.log("listring for message")
})
server.on("error", (err) => {
	console.log("An error occured", err)
})

server.on("message", (msg, info) => {
	console.log("Messaged received")
	console.log("Messaged received")
	console.log("msg", msg.toString("hex"))
	console.log("info", info)

	server.close()
})

export default server
