var Js = require('./index')
/*	var o = new Js('./zone.xlsx')
	o.getSheetByName('ZONES',function(err,data){
	o.output(data)
	})
*/

var o = new Js('./zonetest.xlsx')

o.getSheetByName('Sheet1',function(err,data){
	data.getRow(19).getCell(1).value = 'xxxx'
	data.getRow(19).getCell(2).value = 'xxxx'
	data.getRow(19).getCell(3).value = 'xxxx'
	data.getRow(19).getCell(4).value = 'xxxx'
	console.log(data)
	o.updateSheet(data,'Sheet1')
	o.output('./out.xlsx')	
})
