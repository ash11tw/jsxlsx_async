var Js = require('./index')
	,fs = require('fs')


var o = new Js('./zonetest.xlsx',function(e,o){

	o.getSheetDataByName('Sheet1',function(err,data){
		
		var i = 9, max = data.length, out = [], out1= {}, key,value, tempName = ''
		//get header string
		, keywords = getKeywords(data[0])
		data.forEach(function(item,i){
			var temp = {}
			if (!item || i<9){
				return
			}
		
			
			for(key in keywords){
				value = data[i][keywords[key]]
				temp[key] = value || ''
			}
			if (i % 2 == 1){
				out.push(temp)
				tempName = temp['Zone TemplGroup']+' : '+temp['Zone TemplName']
			}else {
				out1[tempName] = temp
			}

		})
	//	console.log(keywords)
	//	console.log(out)
	/*	fs.writeFile('/home/luk/Documents/angusim/test/hhazone.json',JSON.stringify(out),function(er){
			if (er) console.log(er)
		})
		fs.writeFile('/home/luk/Documents/angusim/test/templatezone.json',JSON.stringify(out1),function(er){
			if (er) console.log(er)
		})
	*/
	})
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

