var U = require('./utils')
	, Constants = require('./constants')
	, Sheet = require('./sheet')
	, Row = require('./row')
	, Cell = require('./cell')
module.exports = (function(){
	var sharedFormulas = {}

	function getValue(data,type,sharedStrings){
		var value = ''
		//deal with value
		if (type == 'formula'){
			value = data['v'][0]
		}else if (type == 'string'){
			value = sharedStrings[+data['v'][0]]
		//default is n (number)
		}else if (data['v']){
			value = data['v'][0]
		}
		//parse value if it is a rich value
		value = U.getRichValue(value)
		return value
	}

	function getCellByReference(ref){
		if (typeof ref === 'string'){
			ref = U.cellReference(ref)
		}
		if (!ref.col || !ref.row){
			throw "this is not valid reference string"
		}
		return this.rows[ref.row].cells[ref.col]
	}

	function parseFormulaReference(ref){
		var refs = ref.split(':'), locate = []
		refs.forEach(function(r){
			locate.push(U.cellReference(r))	
		})
		//only reference to itself
		if (locate.length == 1){
			return {
				type:'none'
			}
		}
		if (locate[0].row == locate[1].row){
			return {
				type:'col'
				, start:locate[0].col
				, end:locate[1].col
			}
		}else if (locate[0].col == locate[1].col){
			return {
				type:'row'
				, start:locate[0].row
				, end:locate[1].row
			}
		}else {
			//TODO: better handling this situation
			throw new Error('references should have the same value in col or row')
		}
	}	

	function getRealFormula(reference,formula){
		var f = sharedFormulas[formula.$.si]
		, master, current, fs = [],out = []
		if (!f){
			//TODO: better handling this situation
			throw new Error('no shared formula found')
		}else {
			master = U.cellReference(f.r)
			current = U.cellReference(reference)
			fs = f.f.split('&')
			fs.forEach(function(sf){
				//comment
				if (/^"[\w\W]*"$/.test(sf)){
					out.push(sf)
				}else {
					console.log(sf)
					console.log('**r'+_rebuild(sf,master,current))
					out.push(_rebuild(sf,master,current))
				}
			})
			return out.join('&')	 	
		}
		return undefined
	
	}
	function _rebuild(f,m,c){
		if (/\$?[A-Z]+\$?[0-9]+/.test(f)){
			return f.replace(/^(.*\$?)([A-Z]+)(\$?)([0-9]+)(.*)$/,function(){
				var n = U.alpha2Num(arguments[2]), arg1 = _rebuild(arguments[1],m,c),arg2 = arguments[2],arg4 = arguments[4]
				if (!/\$$/.test(arg1)){
					arg2 = U.num2Alpha(c.col+n-m.col)
				}
				if (!arguments[3]){
					arg4 = +c.row+1+(+arguments[4])-(m.row+1)
				}
				return arg1+arg2+arguments[3]+arg4+arguments[5]
			})
		}
		return f
	}
	return {
		parse:function(data,sharedStrings){
			var rows = data.worksheet.sheetData[0].row
			, out = [] , temp = []
			, sheet = new Sheet()
			, dim = data.worksheet.dimension[0].$.ref.split(':')
			, boundry = U.cellReference(dim[1])
			, i = 0, j =0, rawData
			sheet.boundry = boundry

			delete data.worksheet.sheetData[0].row
			sheet._raw = data
			//we create empty rows array base on the boundry
			sheet.rows = new Array(boundry.row)
	
			rows.forEach(function(rowData){
				var row = new Row()
				row.num = rowData.$.r -1 //zero base index
				row.cells = new Array(boundry.col)
				if (rowData.c){
					rowData.c.forEach(function(cellData){
						var type
						, value
						, formula
						,reference = cellData.$['r']
						,cellNum = U.cellReference(reference).col
						//deal with type	
						if (cellData.$['t']){
							type = Constants.RTYPE[cellData.$['t']]
						}else {
							//default is number
							type = 'number'
						}
						//deal with formula
						if (cellData['f']){
							formula = cellData['f'][0]
						}
						//share formula
						if (typeof formula === 'object'){
							//real formula
							if (formula._){
						//		console.log(formula)
								if (formula.$.si && formula.$.ref){
									sharedFormulas[formula.$.si] = {
										r:reference
										,f:formula._
										, ref:formula.$.ref
									}
								}
							
								formula = formula._
							//shared ones
							}else {
								formula = getRealFormula(reference,formula)
							}
						}
	

						//assigned to cell
						row.cells[cellNum] = new Cell({
							value:getValue(cellData,type,sharedStrings)
							, type:type
							, reference:reference
							, formula :formula || ""
							, raw:cellData
						})
						
					})
					delete rowData.c
					row._raw = rowData
				}
				sheet.rows[row.num] = row
			})
			return sheet
		}
		, output:function(sheet,originalSharedStrings, sharedStrings){
			var out = sheet._raw
				, rows = []
			if (sheet.rows){
				out.worksheet.sheetData[0] = {row:[]}
			}
			sheet.rows.forEach(function(row){
				var rowRaw
				if (!row){
					return
				}
				rowRaw = row._raw || {}
				if (!rowRaw.$) {rowRaw.$ = {}}
				if (row.cells){
					rowRaw.c = []
				}
				rowRaw.$.r = row.num +1 //1 based index
				row.cells.forEach(function(cell){
					var cellRaw, type, index
					if (!cell){
						return
					}
					cellRaw = cell._raw || {}
					if (!cellRaw.$) {cellRaw.$ = {}}
					cellRaw.$.r = cell.reference
					//TODO: right now, it will put everything as a string except number
					if (cellRaw.v){
						//value changed
						if (cell.value != getValue(cellRaw,cell.type,sharedStrings)){
							if (isNaN(cell.value)){
								cellRaw.v = []
								index = sharedStrings.indexOf(cell.value) 
								if (index < 0){
									sharedStrings.push(cell.value)
									cellRaw.v.push(sharedStrings.length-1) //zero based
									originalSharedStrings.sst.si.push({t:cell.value})
									originalSharedStrings.sst.$.uniqueCount +=1
								}else {
									cellRaw.v[0] = index
								}
								cellRaw.$.t = Constants.TYPE['string']
							
							}else {
								cellRaw.v[0] = cell.value
								delete cellRaw.$.t
							}
						}
					}else if(cell.value){ 
						// new cell
						cellRaw.v = []
						if (isNaN(cell.value)){
							cellRaw.v = []
							index = sharedStrings.indexOf(cell.value) 
							if (index < 0){
								sharedStrings.push(cell.value)
								cellRaw.v.push(sharedStrings.length-1) //zero based
								originalSharedStrings.sst.si.push({t:cell.value})
								originalSharedStrings.sst.$.uniqueCount +=1
								originalSharedStrings.sst.$.count +=1	
							}else {
								cellRaw.v.push(index)	
							}
							cellRaw.$.t = Constants.TYPE['string']
						}else {
							cellRaw.v.push(cell.value)
						}
					}
					
					rowRaw.c.push(cellRaw)	
				})
				out.worksheet.sheetData[0].row.push(rowRaw)
			})
			return out
		}
	}
})()
