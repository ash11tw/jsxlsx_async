module.exports = (function(){
	return {
		alpha2Num:function(name){
			var i = name.length -1
			, number =0
			, pow =1
			for(;i>=0;i -= 1){
				number += (name.charCodeAt(i) - 'A'.charCodeAt(0)+1) * pow
				pow *= 26
			}
			return number-1 //zero base
		}
		, num2Alpha:function(number){
			var r = ''
			//make sure number is a number
			number = +number
			if (isNaN(number)){
				return false
			}
			for (;number>=0;number = Math.floor(number/26)-1){
				r = String.fromCharCode(number%26+65)+r
			}
			return r
		}
		, cellReference:function(param){
			var temp
			if (typeof param == 'object' && param.col && param.row){
				temp = this.num2Alpha(param.col)
				if (temp){
					return temp+(param.row+1)
				}	
			}else if (typeof param == 'string'){
				temp = this.referenceSplit(param)
				return {col:this.alpha2Num(temp[0]),row:+temp[1]-1} //zero base index
			}
			return false
		}
		, referenceSplit:function(param){
			var r =  /^([A-Z]+)\$?([0-9]+)$/.exec(param)
			return [r[1],r[2]]
		}
		//Rich value 
		, getRichValue:function(value){
			var out = [],me = this
			if (Object.prototype.toString.call(value) === '[object Array]'){
				value.forEach(function(v){
					out.push(me.getRichValue(v))
				})
			}else if (typeof value == 'object'){
			
				if (value.hasOwnProperty('t')){
					out.push(me.getRichValue(value.t))	
				}else if (value.hasOwnProperty('_')){
					out.push(me.getRichValue(value._))
				}else {
					//in some situations, there is no t or _
					//consider it is an empty
				}
			//value is string
			}else {
				out.push(value)
			}
			return out.join('')
		}
	}
})()
