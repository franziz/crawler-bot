var DelayMessenger = require("../messenger/delay")

module.exports = class MessengerFactory{
	constructor(){
		this.DELAY = 0
	}

	getMessenger(messenger_name){
		if(messenger_name == this.DELAY){
			return new DelayMessenger()
		}
	}
}