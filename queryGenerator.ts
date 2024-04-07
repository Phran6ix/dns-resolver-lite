
export function CreateADNSQuery(domainName: string) {
	const id = 22
	const flags = 0b0000000100000000

	const QDCOUNT = 1
	const ANCOUNT = 0
	const NSCOUNT = 0
	const ARCOUNT = 0

	const QueryName = GetEncodedQueryName(domainName)
	console.log("QN", QueryName)
	const QueryType = 1
	const QueryClas = 1

	const headerByte = new Uint8Array([
		id >> 8, id && 0xFF,
		flags >> 8, flags && 0xFF,
		0, 1,
		0, 0,
		0, 0,
		0, 0
	])
	console.log("Header", headerByte)

	const query = new Uint8Array(headerByte.length + QueryName.length + 4)
	query.set(headerByte)
	query.set(QueryName, headerByte.length)
	query.set([QueryType >> 8, QueryType && 0xFF, QueryClas >> 8, QueryClas && 0xFF], headerByte.length + QueryName.length)

	const queryHex = Array.from(query).map(byte => byte.toString(16).padStart(2, '0'));
	console.log("Query", queryHex.join(''))
	return queryHex.join('')
}

function GetEncodedQueryName(domainName: string) {
	let labels = domainName.split('.')
	let qNameArray: number[] = []
	labels.map((label) => {
		qNameArray.push(label.length)
		for (let i = 0; i < label.length; i++) {
			qNameArray.push(label.charCodeAt(i))
		}
		qNameArray.push(0)


	})
	console.log(qNameArray)
	return new Uint8Array(qNameArray)
}


