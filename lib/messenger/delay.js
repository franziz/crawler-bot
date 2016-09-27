var Firebase = require("../object/firebase")

module.exports = class DelayMessenger{
	constructor(){
		this.firebase = new Firebase().getFirebase()
	}

	sendMessage(monitorObj, delayObj){
		let doc              = {}
		doc[delayObj.source] = delayObj.delay

		let firebaseDB  = this.firebase.database()
		let crawlersRef = firebaseDB.ref(`crawlers/${monitorObj.name}/status/delay`)
		crawlersRef.set(doc, function(error){
			if(error){
				console.log("Cannot save data!")
			}
		})
		console.log(`There is ${delayObj.delay} second(s) delay`)
	}
}