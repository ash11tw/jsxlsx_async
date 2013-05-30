var Row = require('./row')
	,Utils = require('./utils')
var Sheet = function(){
	this.rows = []
}
Sheet.prototype = {
	getRow :function(num){
		if (this.rows[num]){
			return this.rows[num]
		}else {
			var row = new Row({num:num})
			this.rows.push(row)
			return row
		}
	}
	/**
	*	get cell based on the reference data
	*	@param object/string the reference data
	*	@return object
	*/
	, getCell:function(ref){
		var row 
		if (typeof ref === 'string'){
			ref = Utils.cellReference(ref)
		}
		if (typeof ref !== 'object' || !('col' in ref) || !('row' in ref)){
			throw "this is not valid reference string"
		}
		row = this.getRow(ref.row)
		return row.getCell(ref.col)
			
	}
}

module.exports = Sheet
