var Firebase = require("../object/firebase")

module.exports = class DelayMessenger{
	constructor(){
		this.firebase = Firebase.getInstance().getFirebase()
	}

	sendMessage(monitorObj, delayObj){
		var doc              = {}
		doc[delayObj.source] = delayObj.delay

		var db          = this.firebase.database()
		var crawlersRef = db.ref(`crawlers/${monitorObj.name}/status/delay`)
		crawlersRef.set(doc, function(error){
			if(error){
				console.log("Cannot save data!")
			}
		})
		console.log(`There is ${delayObj.delay} second(s) delay`)
	}
}