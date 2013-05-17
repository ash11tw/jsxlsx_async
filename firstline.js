var Js = require('./index')
	,fs = require('fs')

var name = '1_CONSTRUCTIONSv7', sheet = 'WIN LAYERS'	
var o = new Js('./'+name+'.xlsx',function(e,o){
	o.getSheetDataByName(sheet,function(err,data){
		data[0].forEach(function(v){
			if (v){
				console.log('	\''+v.replace(/\./ig,'')+'\':{type:String,trim:true},')
			}
		})
	})
})
