var Firebase = require("../object/firebase")
var moment   = require("moment")

module.exports = class DelayMessenger{
	constructor(){
		this.firebase = new Firebase().getFirebase()
	}

	sendMessage(monitorObj, delayObj){
		let firebaseDB  = this.firebase.database()
		let crawlersRef = firebaseDB.ref(`crawlers/${monitorObj.name}/status/delay/${delayObj.source}`)
        let document    = {
            seconds:delayObj.delay,
            last_update: moment.now()
        }
		crawlersRef.set(document, function(error){
			if(error){
				console.log("Cannot save data!")
			}else{
				console.log(`[${monitorObj.name}] There is ${delayObj.delay} second(s) delay in ${delayObj.source}`)
			}
		})
	}
}