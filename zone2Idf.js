var Js = require('./index')
	,fs = require('fs')
	
var o = new Js('./zonem.xlsx',function(e,o){
	o.getSheetDataByName('Sheet2',function(err,data){
		//console.log(data)
		var moduleText = 'module.exports = {'+"\n",hhaName,idfName,altName,names = [],first = true
		function rebuild(f){
			var i = 0,max
			, start = false,index = -1
			, stove = []
			f = f.replace(/\r?\n/,'')
			f = f.replace(/^([\w\W]*)(\[[^']+\])([\w\W]*)/,function(){
				var a = arguments[2].slice(0,-1).substring(1)
				return arguments[1]+'zo[\''+a+'\']'+arguments[3]
			})
			if (/^([\w\W]*)(\[[^']+\])([\w\W]*)/.test(f)){
				f = rebuild(f)
			}
			return f
				
		}

		data.forEach(function(item,index){
			var hha = [],formulas = []
			if (!item[0]){
				return 
			}
			switch(item[0]){
				case 'HHA Object:':
					hhaName = item[1]
					item = item.slice(2)
					item = item.map(function(i){
						return i.replace(/\r?\n/,'')
					})
					item = item.filter(function(i){
						if (i){
							return true
						}
					})
					names = item
					break
				case 'Eplus Class:':
					idfName = item[1]
					formulas = data[index-1]
					item = item.slice(2)
					altName = formulas[1]?formulas[1]:idfName
					moduleText += (first?'	':'	,')+'\''+altName+'\':function(zo){'+"\n"
					first = false
					moduleText += '		var o = ['+"\n"
					moduleText += '		\''+idfName+"\',\n"
					item.forEach(function(v,i){
						if (formulas[i+2]){
							moduleText += '		'+rebuild(formulas[i+2]).replace(/’/gm,"'") +",\n"
						}
					})
					//cut the coma
					moduleText = moduleText.slice(0,-2)+"\n"	
					moduleText += '		]'+"\n"
					moduleText += '		return o'+"\n"
					moduleText += '	}'+"\n"
					break
				
			}
		})
		moduleText += '}'
	//	console.log(moduleText)
		fs.writeFile('/home/luk/Documents/angusim/libs/defines/zone2IdfDefine.js',moduleText,function(er){
			if (er) console.log(er)
		})
	})
})
