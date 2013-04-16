var U = require('./utils')

var Cell = function(options){
	options = options || {}
	this.value = options.value || ''
	this.type = options.type || 'string' //default is string
	this.formula = options.formula || ''
	this._raw = options.raw || ''
	this.reference = options.reference
}

Cell.prototype = {
	getNum:function(){
		if (!this.reference){
			throw "reference is empty"
		}
		
		return  U.cellReference(this.reference).col
	}
}
module.exports = Cell
