module.exports = class Database{
	constructor(){
		this.host 		= null
		this.port 		= 27017
		this.name 		= null
		this.collection = null
		this.username   = null
		this.password   = null
		this.authSource = null
	}

	connectionString(){
		var str = ""
		if(!this.username && !this.password){
			str = `mongodb://${this.host}:${this.port}/${this.name}`	
		}else if(this.username && this.password){
			str = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.name}`
		}
		
		if(this.authSource){
			str = `${str}?authSource=${this.authSource}`
		}
		return str
	}
}