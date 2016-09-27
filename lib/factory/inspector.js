var InsertTimeInspector    = require("../inspector/insertTime")
var ConvertedTimeInspector = require("../inspector/convertedTime")

module.exports = class InspectorFactory{
	constructor(){
		this.INSERT_TIME    = 0
		this.CONVERTED_TIME = 1
	}

	getInspector(inspector_name){
		if(inspector_name == this.INSERT_TIME){
			return new InsertTimeInspector()
		}else if(inspector_name == this.CONVERTED_TIME){
			return new ConvertedTimeInspector()
		}
	}
}