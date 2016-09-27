var InsertTimeInspector = require("../inspector/insertTime")

module.exports = class InspectorFactory{
	constructor(){
		this.INSERT_TIME = 0
	}

	getInspector(inspector_name){
		if(inspector_name == this.INSERT_TIME){
			return new InsertTimeInspector()
		}
	}
}