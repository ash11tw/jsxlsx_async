var Js = require('./index')
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
	var o = new Js('./zone.xlsx',function(e,o){
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
					out[cell] = '{type:String,trim:true}'
				}
			})
			return out
		}
	})
