var xlsx= require('../index')
	, fs = require('fs')
	, assert = require('assert')

describe('load sheet and modify the data',function(){
	it('test load',function(done){
		xlsx('./zone.xlsx',function(err,wb){
			if (err){
			}
			wb.getSheetByName('ZONES',function(err,data){
				var keywords = getKeywords(data.rows[0].cells)
				, hhazone = [1,2,3,4,5,6], i = 9
				hhazone.forEach(function(zone){
					var cells = data.rows[i].cells
					, nextcells = data.rows[i+1].cells
					cells[keywords['System#']].value = 'System#'
					cells[keywords['Space Name']].value = 'space name'	
					cells[keywords['Room Template #']].value = 'template '+i
					cells[keywords['floor_id.number||||Zone #']].value = 'Floor '+i	
					nextcells[keywords['floor_id.number||||Zone #']].value = i	
					cells[keywords['Zone Type||||Location']].value	= 'Zone Type'
					nextcells[keywords['Zone Type||||Location']].value = 'Location'	
					i = i+2
				})
				wb.updateSheet(data,'ZONES')
				wb.output('./zonez.xlsx')
				done()
			})
		})
	})	
})


function getKeywords(data){
	var out = {}
	data.forEach(function(cell,index){
		if (cell.value){
			out[cell.value] = cell.getNum()
		}
	})
	return out
}
