var MongoClient = require("mongodb").MongoClient;
var CrawlerMeta = require("../model/crawlerMeta");
var async       = require("async");

class CrawlersMetaFinder{
	constructor(){
		this.connectionString = "mongodb://220.100.163.132/monitor";
		this.collection       = "crawlers_meta";
	}

	findAll(onFinish){
		var self = this;
		async.waterfall([
			function(callback){
				MongoClient.connect(self.connectionString, function(err, db){
					callback(null, db)
				})
			},
			function(db, callback){
				let collection = db.collection(self.collection);
				collection.find({}).toArray(function(err, docs){
					callback(null, db, docs)
				})
			},
			function(db, docs, callback){
				let crawlersMeta = docs.map(function(object, index){
					return new CrawlerMeta(object)
				})
				callback(null, db, crawlersMeta)
			}
		], function(err, db, crawlersMeta){
			db.close()
			onFinish(crawlersMeta)
		})
	}
}
module.exports = CrawlersMetaFinder