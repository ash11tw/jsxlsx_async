var U = require('./utils')
module.exports = (function(){
	
	return {
		parse:function(data,shareStrings){
			var rows = data.worksheet.sheetData[0].row
			, temp = []
			, dim = data.worksheet.dimension[0].$.ref.split(':')
			, boundry = U.cellReference(dim[1])
			, i = 0, j = 0
			, row , cell, out = new Array(boundry.row)
			rows.forEach(function(rowData){
				var rowNum = rowData.$.r -1 //zero base index
				temp = new Array(boundry.col)
				if (rowData.c){
					rowData.c.forEach(function(cell){
	
						var type = cell.$['t']
						, lo = U.cellReference(cell.$['r'])
						, value = ''
						if (type == 'str'){
							value = cell['v'][0]
						}else if (type == 's'){
							value = shareStrings[+cell['v'][0]]
						//default is n (number)
						}else if (cell['v']){
							value = cell['v'][0]
						}
						value = U.getRichValue(value)
						temp[lo.col] = value
					})
				}
				out[rowNum] = temp
				j = 0
				
			})	
			return out
		}
	}
})()
