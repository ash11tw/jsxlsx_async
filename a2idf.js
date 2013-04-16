var Js = require('./index')
	,fs = require('fs')
	, cadDefine = require('./hhaCadDefine')
	
var o = new Js('./autocad.xlsx',function(err,o){
	o.getSheetByName('SYNTAX',function(err,sheet){
		if (err){
			console.log(err)
			return
		}
		var out = {}, hhaName, idfName, fieldNames
		, moduleText = 'module.exports = {'+"\n"
		, rows = sheet.rows
		, header = []
		, first = true
		, methods = {}
		, repeats = '['
		, extStart = 0
		, extRepeat = 0

		/**
		*	construct the text for building hhad to idf formula
		*	@param array cells array
		*	@param names name array
		*/
		function buildForumla(cells,names){
			var i =2
			, max = cells.length
			, array =[], name, tmp, match = ['autocalculate','From LOADS DEFAULTS','']
			, ret = ''
			, repeat = false
			for(;i<max;i +=1){
				name = names[i-2]
				if (!name){
					continue
				}
				if (cells[i].type == 'formula' && cells[i].formula){
					//string
					if (/^A/.test(name)){
						tmp =  _functionInject(_loopString(cells[i].formula))
					//number
					}else if (/^N/.test(name)){
						tmp = _functionInject(_loopNumber(cells[i].formula))
					}
				}else {
					tmp = _functionInject(cells[i].value)
				}
				if (match.indexOf(tmp) > -1){
					tmp = '"'+tmp+'"'
				}
				if (extStart+3 < i && extRepeat >0){
					repeat = true
					tmp = tmp.replace(/^([\w\W]+)(hhaObject\[[\w\W]+\])([\w\W]+)$/,function(){
						return arguments[1]+'s'+arguments[3]
					})
					repeats += 'function(s){ return '+tmp+'},'
					extRepeat -= 1
				}else if (!repeat){
					ret += '		o.'+name+' = '+tmp+"\n"
				}
			}
			return ret
		}

		/**
		*	fetch the formula name in sheet and convert into code readable text 
		*	@param string input text
		*	@return code readable text
		*	TODO: limitation for this function, it only takes one fuction per line.
		* 	needs a recursive function to keep replacing the function
		*/
		function _functionInject(s){
			
			s = s.replace(/^([\w\W \t]*)(get[\w]+)\(\)([\w\W]*)/,function(){
				var arg = 'R'+Math.floor(Math.random() *100)
				methods[arguments[2]] = arg	
				return arguments[1]+'hhaObject[\''+arg +'\']'+arguments[3]
			})
			return s
		}

		/*
		*	loop into the string to reconstruct the string
		*	@param string input string
		*	@return output string
		*/
		function _loopNumber(f){
			var i=0, max
			, commentStart = false
			, temp = '',startIndex = -1, replace = []
			, out =''
			f = f+'&'
			max = f.length
			, stringextra = 0
			for(;i<max;i++){
				//skip all comments
				if (commentStart && f[i] ==  '"'){
					commentStart = false
					continue
				}
				if (!commentStart && f[i] == '"'){
					commentStart = true
					continue
				}
				if (commentStart){
					continue
				}
				if (f[i] == '&'){
					if (temp && /^[A-Z]+\$?[0-9]+/.test(temp)){
						replace.push({
							index :startIndex
							, length :temp.length
							,string:'+hhaObject[\''+sheet.getCell(temp).value+'\']'
						})
					}else if(temp){
						throw 'other string need to be wrapped with "'
					}
					temp = ''
					startIndex = -1
				}else {
					if (!temp){
						startIndex = i
					}
					temp +=f[i]
				}
			}
			replace.forEach(function(item, index){
				//check if there is next one
				if (replace[index+1]){
					stringextra += item.string.length-item.length
					replace[index+1].index += stringextra	
				}
				f = f.substring(0,item.index)+item.string+f.substring(item.index+item.length)
			})
			f = f.replace(/&/ig,'').replace(/"/ig,'').substring(0,f.length-1)
			return f
		}

		/*
		*	loop into the string to reconstruct the string
		*	@param string input string
		*	@return output string
		*/
		function _loopString(f){
			var i=0, max
			, commentStart = false
			, temp = '',startIndex = -1, replace = []
			, out =''
			f = f+'&'
			max = f.length
			, stringextra = 0
			for(;i<max;i++){
				//skip all comments
				if (commentStart && f[i] ==  '"'){
					commentStart = false
					continue
				}
				if (!commentStart && f[i] == '"'){
					commentStart = true
					continue
				}
				if (commentStart){continue}
				if (f[i] == '&'){
					if (temp && /^[A-Z]+\$?[0-9]+/.test(temp)){
						replace.push({
							index :startIndex
							, length :temp.length
							,string:'hhaObject[\''+sheet.getCell(temp).value+'\']'
						})
					}else if(temp){
						throw 'other string need to be wrapped with "'
					}
					temp = ''
					startIndex = -1
				}else {
					if (!temp){
						startIndex = i
					}
					temp +=f[i]
				}
				
			}
			replace.forEach(function(item, index){
				//check if there is next one
				if (replace[index+1]){
					stringextra += item.string.length-item.length
					replace[index+1].index += stringextra	
				}
				f = f.substring(0,item.index)+item.string+f.substring(item.index+item.length)
			})
			f = f.replace(/&/ig,'+').substring(0,f.length-1)
			return f
		}
		function buildFieldNames(cells){
			var i =2
			, max = cells.length
			, array = [] 
			for(;i<max;i +=1){
				if (cells[i].value){
					array.push(cells[i].value)
				}
			}
			return array
		}
		rows.forEach(function(item,index ){
			if (!item){
				return
			}
			var cells = item.cells
			, header = cells[0]?cells[0].value: ''
			if (!header){
				return 
			}
			switch(header){
				case 'CAD Object':
				case 'HHA Object':
					hhaName = cells[1].value
					
					moduleText += (!first?'	,':'	')+'"'+hhaName+'"' + ':{'+"\n"
					first = false
					extStart = 0
					extRepeat = 0
					repeats = '['
					if (cadDefine[hhaName]){
						if (cadDefine[hhaName].hasOwnProperty('extStart')){
							extStart = cadDefine[hhaName].extStart
						}
						if (cadDefine[hhaName].hasOwnProperty('extRepeat')){
							extRepeat = cadDefine[hhaName].extRepeat
						}
					}
					break
				case 'V7.2 E+ object Field:':
					idfName = cells[1].value
					methods = {}
					moduleText += "	run:function(hhaObject,cb){\n"
					moduleText += "		var o = {}\n"
					if (idfName){
						moduleText += "		o.name = '"+idfName+"'\n"
					}
					fieldNames = buildFieldNames(cells)
					
					break
				case 'Data:':
					moduleText += "\n"
					moduleText +=buildForumla(cells,fieldNames)
					moduleText +="		cb(o,hhaObject)"+"\n"
					moduleText +="	}"+"\n"
					if (Object.keys(methods).length != 0){
						moduleText += '	, methods : '+ JSON.stringify(methods)+"\n"
					}
					repeats = repeats.slice(0,-1)+']'
					if (repeats.length >1){
						moduleText += '	, repeats : '+ repeats+"\n"
					}
					moduleText +="	}"+"\n"
					break
				
			}
		})
		moduleText += "}\n"	
	//	console.log(moduleText)
		fs.writeFile('/home/luk/Documents/jsxlsx/hhaCad2IdfDefine.js',moduleText,function(er){
			if (er) console.log(er)
		})
	})
})
