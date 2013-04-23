var Js = require('./index')
	,fs = require('fs')
	
var o = new Js('./project.xlsx',function(e,o){
	o.getSheetDataByName('CSV2',function(err,data){
		//console.log(data)
		var moduleText = 'module.exports = function(project){'+"\n"+'	var o = []'+"\n"
		, start = false
		data.forEach(function(item,index){
			item = item[0]
			if (/^!/.test(item)){
				moduleText += 'o.push(\''+item+"')\n"
			}else if (/^[ \t]+/.test(item)){
				item = item.trim()
				if (/;$/.test(item)){
					moduleText += "'"+item.replace(';','')+'\'])'+"\n"
				}else {
					moduleText += 	"'"+item.replace(',','')+"',"
				}
				
			}else if (item){
				item = item.replace(',','')
				moduleText += 'o.push([\''+item+'\','
			}

		})
		moduleText += '}'
		console.log(moduleText)
		fs.writeFile('/home/luk/Documents/angusim/libs/defines/project2IdfDefine.js',moduleText,function(er){
			if (er) console.log(er)
		})
	})
})
