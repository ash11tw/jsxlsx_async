var ENTITIES =
{ 
//"apos" : "'"
"quot" : "\""
//, "amp"  : "&"
, "gt"   : ">"
, "lt"   : "<"
}

function entityParser(string){
	var key,reg
	string = string.replace(/&/gm,'&amp;')
	for (key in ENTITIES){
		reg = new RegExp(ENTITIES[key],'gm')
		string = string.replace(reg,'&'+key+';')
	}
	return string
}

function analyze(data,parentName,attributes){
	var out ='', key,item, closeTag = false,otherTag = false, DEBUG = false
	if (Array.isArray(data)){
		data.forEach(function(it){
			out += analyze(it,parentName,attributes)
		})
	}else if (typeof data == 'object'){
		//empty object
		if (Object.keys(data).length == 0){
			out += '<'+parentName+'/>'
		}else {
			if (data.hasOwnProperty('$')){
				out += '<'+parentName+' '+analyze(data.$,null,true).replace(/ $/,'')+'>'
				closeTag = true 
			}
			for(key in data){
				if (key == '$'){continue}
				item = data[key]
				otherTag = true
				//we don't create the extra tag for _
				if (key == '_'){
					key = null
				}
				out += analyze(item,key,attributes)
			}
			if (closeTag){
				if (otherTag){
					out += '</'+parentName+'>'
				}else {
					out = out.replace(/>$/,'')+'/>'
				}
			}else {
				if (otherTag && parentName){
					out = '<'+parentName+'>'+out+'</'+parentName+'>'
				}
			}
		}
	}else {
		data = entityParser(data.toString()) 
		if (parentName){
			if (attributes){
				out = parentName + '="'+data+'" ' 
			}else {
				out = '<'+parentName+'>'+data+'</'+parentName+'>'
			}
		}else {
			out = data
		}
	}
	return out
}

module.exports = function(data){
	var out = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
	out +=analyze(data)
	return out
}
