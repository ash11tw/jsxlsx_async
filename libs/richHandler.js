module.exports.getValue = function (o){
	var text = ''
	if (Array.isArray(o)){
		o.forEach(function(v,i){
			var t = v.t[0] //should always has one only
			if (typeof t == 'object'){
				if (t._){
					text += t._
				}
			}else if (t){
				text += t
			}
		})
	}
	return text
}
