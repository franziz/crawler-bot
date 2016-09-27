var mongoClient = require("mongodb").MongoClient
var Delay       = require("../object/delay")
var moment      = require("moment")

module.exports = class InsertTimeInspector{
	constructor(){
	}

	inspect(sourceName, dbObject, callback){
		mongoClient.connect(dbObject.connectionString(), function(err,db){
			let collection = db.collection(dbObject.collection)
			collection.find({},{SourceName:sourceName, DateInsertedIntoCentralDB:1}).sort({$natural:-1}).limit(1).toArray(function(err, docs){
				db.close()
				
				if(!docs){
					console.log(`Cannot find ${sourceName} inside CentralDB`)
					return null
				}
				
				let latest_date = docs[0].DateInsertedIntoCentralDB
				latest_date     = moment(latest_date)
				
				let delayObj    = new Delay()
				delayObj.delay  = (new Date() - latest_date)/1000
				delayObj.source = "converted_time"
				callback(delayObj)
			})
		})
	}
}