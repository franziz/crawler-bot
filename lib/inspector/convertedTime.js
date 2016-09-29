var mongoClient = require("mongodb").MongoClient
var Database    = require("../object/database")
var Delay       = require("../object/delay")
var moment      = require("moment")

module.exports = class ConvertedTimeInspector{
	constructor(){
		this.db            = new Database()
		this.db.host       = "220.100.163.138"
		this.db.username   = "alex"
		this.db.password   = "07081984"
		this.db.name       = "isid"
		this.db.collection = "mention"
		this.db.authSource = "admin"
	}

	inspect(monitorObj, callback){
		var databaseObj = this.db
		mongoClient.connect(databaseObj.connectionString(), function(err,db){
			let collection = db.collection(databaseObj.collection)
			collection.find({SentFromHost:"220.100.163.132", SourceName:monitorObj.domain},{DateInsertedIntoCentralDB:1}).sort({$natural:-1}).limit(1).toArray(function(err, docs){
				db.close()
				
				if(!docs || docs.length === 0){
					console.log(`Cannot find ${monitorObj.domain} inside CentralDB`)
					return null
				}
				
				let latestDate  = docs[0].DateInsertedIntoCentralDB
				let currentTime = new Date()
				latestDate      = moment(latestDate)
				
				let delayObj    = new Delay()
				delayObj.delay  = (currentTime - latestDate)/1000
				delayObj.source = "converted_time"
				
// 				console.log(`Converted Time: ${latestDate}`)
// 				console.log(`Current Time: ${currentTime}`)
				callback(delayObj)
			})
		})
	}
}