var xlsx= require('../index')
	, fs = require('fs')
	, assert = require('assert')

describe('load sheet and modify the data',function(){
	it('load data as an array',function(done){
		xlsx('./test/test.xlsx',function(err,wb){
			wb.getSheetDataByName('Sheet1',function(err,data){
				assert.equal(data[0][0],1)
				assert.equal(data[1][0],'A')
				assert.equal(data[2][0],'1A')
				done()
			})
		})
		
	})
	it('load data as a sheet object',function(done){
		xlsx('./test/test.xlsx',function(err,wb){
			wb.getSheetByName('Sheet1',function(err,sheet){
				var rows = sheet.rows
				assert.equal(sheet.getCell('A1').value,1)
				assert.equal(sheet.getCell('A1').type,'number')
				assert.equal(sheet.getCell('A2').type,'string')
				assert.equal(rows[2].cells[2].formula,'C1&C2')
				done()
			})
		})
		
	})
})


