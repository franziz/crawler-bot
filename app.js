console.log("Starting Monitor App")

var MessengerFactory = require("./lib/factory/messenger")
var InspectorFactory = require("./lib/factory/inspector")
var FinderFactory    = require("./lib/factory/finder")
var Database 	     = require("./lib/object/database")
var Monitor          = require("./lib/object/monitor")
var Firebase         = require("./lib/object/firebase")

let firebase = new Firebase()
firebase.init()
firebase = firebase.getFirebase()

let db     = firebase.database()
let reqRef = db.ref("requests/crawler_name")

reqRef.on("value", function(snapshot){
	crawlerName = snapshot.val()
	console.log(`Getting ${crawlerName} informations.`)

	finder_factory = new FinderFactory()
	finder         = finder_factory.getFinder(finder_factory.CRAWLER_META)
	finder.find(crawlerName, function(monitorObj){
		let inspector_factory = new InspectorFactory()
		let inspector         = inspector_factory.getInspector(inspector_factory.INSERT_TIME)
		inspector.inspect(monitorObj.db, function(delayObj){
			let messenger_facotry = new MessengerFactory()
			let messenger         = messenger_facotry.getMessenger(messenger_facotry.DELAY)
			messenger.sendMessage(monitorObj, delayObj)
		})
		
		monitorObj.db   	     = new Database()
		monitorObj.db.host 	     = "220.100.163.138"
		monitorObj.db.username   = "alex"
		monitorObj.db.password   = "07081984"
		monitorObj.db.name       = "isid"
		monitorObj.db.collection = "mention"
		monitorObj.db.authSource = "admin"
		
		inspector = inspector_factory.getInspector(inspector_factory.CONVERTED_TIME)
		inspector.inspect(monitorObj.domain, monitorObj.db, function(delayObj){
			let messenger_factory = new MessengerFactory()
			let messenger         = messenger_factory.getMessenger(messenger_factory.DELAY)
			messenger.sendMessage(monitorObj, delayObj)
		})
	})
}, function(err){
	console.log(`Error: ${err.code}`)
})

console.log("Monitor App is listening to Firebase")