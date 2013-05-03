var Js = require('./index')
	,fs = require('fs')
	
var o = new Js('./autocad.xlsx',function(e,o){
	o.getSheetDataByName('SYNTAX',function(err,data){
		var out = {}, hhaName, idfName, moduleText = 'module.exports={'
		data.forEach(function(item,index){
			var hha = [],extStart = -1, temp = ''
			if (!item[0]){
				return 
			}
			switch(item[0]){
				case 'CAD Object':
					hhaName = item[1]
					//remove the first forth elements
					item = item.slice(4)
					item = item.map(function(i){
						return "'"+i.replace(/\r?\n/,'')+"'"
					})
					data[index+1].forEach(function(v,i){
						if (/^!!/.test(v)){
							var temp = {}
							
							item[i-4] = '{name:'+item[i-4]+',func:function(v){ return v'+v.replace('!!','')+'}}'
						}
					})
					item = item.filter(function(i){
						if (i && i != "''"){
							return true
						}
					})
					out[hhaName] = {}
					//looking for extensible items
					if (item.indexOf("'EXTENSIBLE !!'") > -1){
						extStart = item.indexOf("'# vertices'")
						
						if (extStart > -1){
							temp = ',extStart:'+(extStart +1)+',extRepeat:3'	
							out[hhaName].extStart = extStart +1 //the next one is the start item	
							out[hhaName].extRepeat = 3 //it is always 3 for now. 	
						}
						//get rid of the extensible string 
						item.pop()
					}
					moduleText+="'"+hhaName+"':{attributes:["+item.join(',')+"]"+temp+"},"
					console.log(moduleText)
					out[hhaName].attributes = item
					break
				case 'V7.2 E+ object Field:':
					//idfName = item[0]
					//moduleText = startText + idfName.replace(':','') + '= function(hhaObject){' +"\n"
					break
				case 'Data:':
					//moduleText += "	var o = {}\n"
					//moduleText += "" 
					break
				
			}
		})
		moduleText = moduleText.replace(/,$/,'')+"}"
		//fs.writeFile('/home/luk/Documents/jsxlsx/hhaCadDefine.js',moduleText,function(er){
		fs.writeFile('/home/luk/Documents/angusim/libs/defines/hhaCadDefine.js',moduleText,function(er){
			if (er) console.log(er)
		})
	})
})
