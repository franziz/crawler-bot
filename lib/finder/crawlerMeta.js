var mongoClient = require("mongodb").MongoClient
var Database    = require("../object/database")
var Monitor     = require("../object/monitor")

module.exports = class CrawlerMetaFinder{
	constructor(){
		this.db 	   	   = new Database()
		this.db.host 	   = '220.100.163.132'
		this.db.name 	   = "monitor"
		this.db.collection = "crawlers_meta"
	}

	find(crawlerName, callback){
		var dbObject = this.db
		mongoClient.connect(dbObject.connectionString(), function(err,db){
			let collection = db.collection(dbObject.collection)
			collection.findOne({name:crawlerName},function(err,doc){
				db.close()

				let monitorObj           = new Monitor()
				monitorObj.db            = new Database()
				monitorObj.db.host       = doc.db.host
				monitorObj.db.post       = doc.db.port
				monitorObj.db.name       = doc.db.name
				monitorObj.db.collection = doc.db.collection
				monitorObj.name          = crawlerName
				callback(monitorObj)
			})
		})
	}
}
