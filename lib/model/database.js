class Database{
	constructor(doc){
		this.port 		= doc.port
		this.name 		= doc.name
		this.host 		= doc.host
		this.collection = doc.collection

		this.connectionString = `mongodb://${this.host}:${this.port}/${this.name}`
	}
}

module.exports = Database