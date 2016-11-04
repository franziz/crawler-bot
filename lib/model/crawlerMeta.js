var Database = require("./database")

class CrawlerMeta{
	constructor(doc){
		if(!doc)
			return null
		this.name = doc.name
		this.type = doc.type
		this.db   = new Database(doc.db)
	}
}
module.exports = CrawlerMeta