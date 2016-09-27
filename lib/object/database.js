module.exports = class Database{
	constructor(){
		this.host 		= null
		this.port 		= 27017
		this.name 		= null
		this.collection = null
	}

	connectionString(){
		return `mongodb://${this.host}:${this.port}/${this.name}`
	}
}