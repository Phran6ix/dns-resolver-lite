import { CreateADNSQuery } from "./queryGenerator";
import udpServer from './udpserver'

const domainName = process.argv[2]
const query = CreateADNSQuery(domainName)

const queryBuffer = Buffer.from(query, "hex")
udpServer.send(queryBuffer, 53, "8.8.8.8", (err, byte) => {
	if (err) {
		console.log("Error occured", err)
	}

	console.log(byte)
})
