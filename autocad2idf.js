var Js = require('./index')
	,fs = require('fs')
	
var o = new Js('./autocad.xlsx',function(e,o){
	o.getSheetDataByName('SYNTAX',function(err,data){
		var out = {}, hhaName, idfName, moduleText
		, startText = 'module.exports.'
		data.forEach(function(item){
			var hha = [],extStart = -1
			if (!item[0]){
				return 
			}
			switch(item[0]){
				case 'CAD Object':
					hhaName = item[1]
					//remove the first forth elements
					item = item.slice(4)
					item = item.map(function(i){
						return i.replace(/\r?\n/,'')
					})
					item = item.filter(function(i){
						if (i){
							return true
						}
					})
					out[hhaName] = {}
					//looking for extensible items
					if (item.indexOf('EXTENSIBLE !!') > -1){
						extStart = item.indexOf('# vertices')
						
						if (extStart > -1){
							out[hhaName].extStart = extStart +1 //the next one is the start item	
							out[hhaName].extRepeat = 3 //it is always 3 for now. 	
						}
						//get rid of the extensible string 
						item.pop()
					}
					out[hhaName].attributes = item
					break
				case 'V7.2 E+ object Field:':
					idfName = item[0]
					moduleText = startText + idfName.replace(':','') + '= function(hhaObject){' +"\n"
					break
				case 'Data:':
					moduleText += "	var o = {}\n"
					moduleText += "" 
					break
				
			}
		})
		fs.writeFile('/home/luk/Documents/jsxlsx/hhaCadDefine.js','module.exports='+JSON.stringify(out),function(er){
			if (er) console.log(er)
		})
	})
})
