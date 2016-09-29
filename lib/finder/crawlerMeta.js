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
				
				if(!doc){
					console.log(`Cannot find ${crawlerName} inside ${dbObject.name} db`)
					return null
				}
				
				callback(new Monitor(doc))
			})
		})
	}
	
	findAll(callback){
		var dbObject = this.db
		mongoClient.connect(dbObject.connectionString(), function(err, db){
			let collection = db.collection(dbObject.collection)
			collection.find({}).toArray(function(err, documents){
				db.close()
				
				var result = []
				for(var a=0;a<documents.length;a++){
					result.push(new Monitor(documents[a]))
				}
				callback(result)
			})
		})
	}
}
