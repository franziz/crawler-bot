var firebase = require("firebase");
var async    = require("async");
var moment   = require("moment");

var FinderFactory    = require("./lib/factory/finder")
var InspectorFactory = require("./lib/factory/inspector")

firebase.initializeApp({
    serviceAccount: "./key/crawler-helper-7931ce4a58df.json",
    databaseURL: "https://crawler-helper.firebaseio.com/" 
})

let factory = new FinderFactory()
finder      = factory.get_finder(factory.CRAWLERS_META)
finder.findAll(function(crawlersMeta){
	crawlersMeta.map(function(object, index){
		async.parallel({
			insertTime: function(callback){
				let factory 			= new InspectorFactory();
				let insertTimeInspector = factory.get_inspector(factory.INSERT_TIME);
				insertTimeInspector.inspect(object, function(report){
					callback(null, report)
				})
			},
			convertedTime: function(callback){
				let factory 			   = new InspectorFactory();
				let convertedTimeInspector = factory.get_inspector(factory.CONVERTED_TIME);
				convertedTimeInspector.inspect(object, function(report){
					callback(null, report)
				})
			}
		}, function(err, results){
			let insertReport    = results.insertTime
			let convertedReport = results.convertedTime
			// console.log(convertedReport)
			if(insertReport)
				insertReport.sendReport()
			if(convertedReport)
				convertedReport.sendReport()
		})
	})
})