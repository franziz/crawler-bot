var mongoClient = require("mongodb").MongoClient
var Delay       = require("../object/delay")

module.exports = class InsertTimeInspector{
	constructor(){
	}

	inspect(dbObject, callback){
		mongoClient.connect(dbObject.connectionString(), function(err,db){
			collection = db.collection(dbObject.collection)
			collection.find({},{_insert_time:1}).sort({$natural:-1}).limit(1).toArray(function(err, docs){
				db.close()

				latest_date     = docs[0]["_insert_time"]
				delayObj        = new Delay()
				delayObj.delay  = (new Date() - latest_date)/1000
				delayObj.source = "insert_time"
				callback(delayObj)
			})
		})
	}
}