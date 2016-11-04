var MongoClient = require("mongodb").MongoClient
var async       = require("async")

var DelayReport = require("../model/report")

class ConvertedTimeInspector{
	inspect(crawlerMeta, onFinish){
		// var centralDBConnectionString = "mongodb://alex:07081984@220.100.163.138/isid?authSource=admin";
		var centralDBConnectionString = "mongodb://220.100.163.132/monitor"

		async.waterfall([
			function(callback){
				MongoClient.connect(centralDBConnectionString, function(err, db){
					if(err) return
					callback(null, db)
				})
			},
			function(db, callback){
				let collection = db.collection("converter")
				collection.find({state: "STOP", message: new RegExp(crawlerMeta.name,"i"), number_of_documents:{$gt:0}}).sort({$natural:-1}).toArray(function(err, docs){
					callback(null, db, docs)
				})
			},
			function(db, docs, callback){
				if(!docs){
					console.log(`Cannot find any document of ${crawlerMeta.name} in Central DB`)
					callback(null, db, null)
					return
				}
				if(docs.length === 0){
					console.log(`Cannot find any document of ${crawlerMeta.name} in Central DB`)
					callback(null, db, null)
					return
				}

				let latestDate  = docs[0]._insert_time
				let currentTime = new Date()

				let delayReport    = new DelayReport()
				delayReport.victim = crawlerMeta.name
				delayReport.delay  = (currentTime - latestDate)/1000
				delayReport.source = "converted_time"

				callback(null, db, delayReport)
			}
		], function(err, db, delayReport){
			db.close()
			onFinish(delayReport)
		})
	}
}

module.exports = ConvertedTimeInspector