var Cell = require('./cell')
	,U = require('./utils')
	
var Row = function(options){
	if (options && options.num){
		this.num = options.num
	}
	this.cells = []
}

Row.prototype = {
	getCell:function(num){
		if (this.cells[num]){
			return this.cells[num]
		}else {
			cell = new Cell({reference:U.num2Alpha(num)+this.num})
			this.cells.push(cell)
			return cell
		}
	}
}

module.exports = Row
