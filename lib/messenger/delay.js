var Firebase = require("../object/firebase")

module.exports = class DelayMessenger{
	constructor(){
		this.firebase = new Firebase().getFirebase()
	}

	sendMessage(monitorObj, delayObj){
		let firebaseDB  = this.firebase.database()
		let crawlersRef = firebaseDB.ref(`crawlers/${monitorObj.name}/status/delay/${delayObj.source}`)
		crawlersRef.set({seconds:delayObj.delay}, function(error){
			if(error){
				console.log("Cannot save data!")
			}
		})
		console.log(`There is ${delayObj.delay} second(s) delay`)
	}
}