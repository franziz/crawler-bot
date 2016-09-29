var Database         = require("./database")
var InspectorFactory = require("../factory/inspector")
var MessengerFactory = require("../factory/messenger")

module.exports = class Monitor{
	constructor(document=null){
		this.db     = null
		this.name   = null
		this.domain = null
		
		if(document){
			this.db			   = new Database()
			this.db.name 	   = document.db.name
			this.db.host 	   = document.db.host
			this.db.port       = document.db.port
			this.db.collection = document.db.collection
			
			this.name   = document.name
			this.domain = document.domain
		}
	}
	
	updateStatus(callback){
		var self                   = this
		let factory                = new InspectorFactory()
		let insertTimeInspector    = factory.getInspector(factory.INSERT_TIME)
		let convertedTimeInspector = factory.getInspector(factory.CONVERTED_TIME)
		
		insertTimeInspector.inspect(self.db, function(delayObj){
			let messengerFactory = new MessengerFactory()
			let delayMessenger   = messengerFactory.getMessenger(messengerFactory.DELAY)
			delayMessenger.sendMessage(self, delayObj)
		})
		
		convertedTimeInspector.inspect(self, function(delayObj){
			let messengerFactory = new MessengerFactory()
			let delayMessenger   = messengerFactory.getMessenger(messengerFactory.DELAY)
			delayMessenger.sendMessage(self, delayObj)
		})
	}
}