var MongoClient = require("mongodb").MongoClient
var async       = require("async")

var DelayReport = require("../model/report")

class InsertTimeInspector{
	inspect(crawlerMeta, onFinish){
		async.waterfall([
			function(callback){
				MongoClient.connect(crawlerMeta.db.connectionString, function(err, db){
					if(err) return
					callback(null, db)
				})
			},
			function(db, callback){
				let query = {}
				/* Assuming that News Crawler and Blog Crawler are inside news_crawler and blog_crawler collection 
				   They are not separated for each crawler.
				*/
				if(crawlerMeta.type === "News" || crawlerMeta.type === "Blog")
					query = {_crawled_by: new RegExp(crawlerMeta.name,"i")}

				let collection = db.collection(crawlerMeta.db.collection)
				collection.find(query,{_insert_time: 1}).sort({$natural:-1}).limit(1).toArray(function(err, docs){
					callback(null, db, docs)
				})
			},
			function(db, docs, callback){
				if(!docs){
					callback(null, db, null)
					return
				}
				if(docs.length === 0){
					callback(null, db, null)
					return
				}

				let latestDate  = docs[0]._insert_time
				let currentTime = new Date()

				let delayReport    = new DelayReport()
				delayReport.victim = crawlerMeta.name
				delayReport.delay  = (currentTime - latestDate)/1000
				delayReport.source = "insert_time"
				callback(null, db, delayReport)
			}
		], function(err, db, delayReport){
			db.close()
			onFinish(delayReport)
		})
	}
}
module.exports = InsertTimeInspector