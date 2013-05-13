var Js = require('./index')
	,fs = require('fs')
	
var o = new Js('./doem.xlsx',function(e,o){
	o.getSheetDataByName('matrix',function(err,data){
		//console.log(data)
		var moduleText = 'module.exports = {'+"\n",hhaName,idfName,altName,names = [],first = true
		function rebuild(f){
			var i = 0,max
			, start = false,index = -1
			, stove = []
			f = f.replace(/\r?\n/,'')
			f = f.replace(/^([\w\W]*)(\[[^']+\])([\w\W]*)/,function(){
				var a = arguments[2].slice(0,-1).substring(1)
				return arguments[1]+'doe[\''+a+'\']'+arguments[3]
			})
			if (/^([\w\W]*)(\[[^']+\])([\w\W]*)/.test(f)){
				f = rebuild(f)
			}
			return f
				
		}

		data.forEach(function(item,index){
			var hha = [],formulas = [],repeat='',repeatStart = '		doe.repeat.forEach(function(item){'+"\r\n",repeatEnd ='		})'+"\r\n"
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
					moduleText += (first?'	':'	,')+'\''+altName+'\':function(doe){'+"\n"
					first = false
					moduleText += '		var o = ['+"\n"
					moduleText += '		\''+idfName+"\',\n"
					item.forEach(function(v,i){
						if (formulas[i+2] && !/^##/.test(formulas[i+2])){
							moduleText += '		'+rebuild(formulas[i+2]).replace(/’/gm,"'") +",\n"
						//repeat items
						}else if (formulas[i+2]){
							formulas[i+2] = formulas[i+2].replace('##','')
							repeat += '				o.push('+rebuild(formulas[i+2]).replace(/’/gm,"'") +")\n"
						}
					})
					//cut the coma
					moduleText = moduleText.slice(0,-2)+"\n"	
					moduleText += '		]'+"\n"
					if (repeat){
						console.log(repeat)	
						moduleText = moduleText+ repeatStart +repeat + repeatEnd
					}
					moduleText += '		return o'+"\n"
					moduleText += '	}'+"\n"
					break
				
			}
		})
		moduleText += '}'
	//	console.log(moduleText)
		fs.writeFile('/home/luk/Documents/angusim/libs/defines/doe2IdfDefine.js',moduleText,function(er){
			if (er) console.log(er)
		})
	})
})
