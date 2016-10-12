var mongoClient = require("mongodb").MongoClient
var Delay       = require("../object/delay")

module.exports = class InsertTimeInspector{
	constructor(){
	}

	inspect(dbObject, callback){
		mongoClient.connect(dbObject.connectionString(), function(err,db){
            if(err) return null

			let collection = db.collection(dbObject.collection)
			collection.find({},{_insert_time:1}).sort({$natural:-1}).limit(1).toArray(function(err, docs){
				db.close()

				if(!docs[0]){
					console.log(`Cannot find ${dbObject.collection} in ${dbObject.name} database`)
					return null
				}

				let latestDate = docs[0]._insert_time
				let delayObj    = new Delay()
				let currentTime = new Date()
				delayObj.delay  = (currentTime - latestDate)/1000
				delayObj.source = "insert_time"
				callback(delayObj)
			})
		})
	}
}