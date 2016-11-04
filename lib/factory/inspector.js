var InsertTimeInspector    = require("../inspector/insertTime")
var ConvertedTimeInspector = require("../inspector/convertedTime")

class InspectorFactory{
	constructor(){
		this.INSERT_TIME    = 0;
		this.CONVERTED_TIME = 1;
	}

	get_inspector(inspector_name){
		if(inspector_name === this.INSERT_TIME){
			return new InsertTimeInspector()
		}else if(inspector_name === this.CONVERTED_TIME){
			return new ConvertedTimeInspector()
		}
	}
}
module.exports = InspectorFactory