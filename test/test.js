var zl= require('./../zoneLoad')

describe('zone load',function(){
	zl('./test/test.xlsx',function(err,data){
		console.log(data)
	})
})
