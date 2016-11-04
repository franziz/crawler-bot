var firebase = require("firebase")
var moment   = require("moment")

class DelayReport{
	constructor(){
		this.victim = null
		this.delay  = null
		this.source = null
	}

	sendReport(){
		let doc = {
			seconds: this.delay,
			lastUpdate: moment.now()
		}
		firebase
		.database()
		.ref(`crawlers/${this.victim}/status/delay/${this.source}`)
		.set(doc)
	}
}

module.exports = DelayReport