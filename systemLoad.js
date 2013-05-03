var Js = require('./index')
	, fs = require('fs')
/*
module.exports = function(path,cb){
	var o = new Js(path)
	o.getSheetDataByName('ZONES',function(err,data){
		var i = 9, max = data.length, out = [], temp = {}
		//get header string
		, keywords = getKeywords(data[0])
		for (;i<11;i+=2){
			for(key in keywords){
				temp[key] = data[i][keywords[key]]
			}
			out.push(temp)
		}
		console.log(keywords)
//		console.log(out)
	})

	function getKeywords(data){
		var out = {}
		data.forEach(function(cell,index){
			if (cell){
				out[cell] = index
			}
		})
		return out
	}
}
*/
	var o = Js('./systemLoad.xlsx',function(err,o){
		o.getSheetByName('CRITERIA',function(err,data){
			//console.log(data)
			return
			var i = 8, max = data.length, out = [],out1={}, temp
			//get header string
			, keywords = getKeywords(data[0])
			for (;i<max;i+=2){
				temp = {}
				console.log(data[i])
				for(key in keywords){
					temp[key] = data[i][keywords[key]]
				}
				if (data[i][keywords['SysLoad. ID']]){
					out.push(temp)
				}
				if (data[i][keywords['SysLoad. IsTempl%%']] == '1'){
					out1[temp['SysLoad. Name']] = temp
				} 
			}
		//	console.log(keywords)
			console.log(out)
			fs.writeFile('/home/luk/Documents/angusim/test/hhasystem.json',JSON.stringify(out),function(er){
				if (er) console.log(er)
			})
			fs.writeFile('/home/luk/Documents/angusim/test/templatesystem.json',JSON.stringify(out1),function(er){
				if (er) console.log(er)
			})
		})
	})

	function getKeywords(data){
		var out = {}
		data.forEach(function(cell,index){
			if (cell){
				out[cell.trim()] = index
			}
		})
		return out
	}
