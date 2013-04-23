var sax = require('sax')

var defaults =  {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '$$',
      charsAsChildren: false,
      async: false
    }

module.exports = function(stream,cb){
	var stack = [], out = {}
        if (defaults.xmlns) {
        	defaults.xmlnskey = defaults.attrkey + "ns"
      	}
	function textHandle(text) {
		var s
		, charkey = defaults.charkey
		s = stack[stack.length - 1]
		if (s) {
			return s[charkey] += text
		}
	};
	this.sax = sax.createStream(true,{
		trim: false,
		normalize: false,
		xmlns: defaults.xmlns
	})
        this.sax.on('opentag',function(node) {
		var key, obj, _ref
		, charkey = defaults.charkey
		, attrkey = defaults.attrkey
		obj = {}
		obj[charkey] = ""
		if (!defaults.ignoreAttrs) {
			_ref = node.attributes
		  	for (key in _ref) {
		    		if (!(attrkey in obj) && !defaults.mergeAttrs) {
		      			obj[attrkey] = {}
		    		}
		    		if (defaults.mergeAttrs) {
		      			obj[key] = node.attributes[key]
		    		} else {
		      			obj[attrkey][key] = node.attributes[key]
		    		}		
		  	}
		}
		obj["#name"] = defaults.normalizeTags ? node.name.toLowerCase() : node.name
		if (defaults.xmlns) {
			obj[defaults.xmlnskey] = {
		    		uri: node.uri,
		    		local: node.local
		  	}
		}
		return stack.push(obj)
      	})
        this.sax.on('closetag',function() {
		var node
			, obj = stack.pop()
			, nodeName = obj["#name"]
			, old 
			, s = stack[stack.length - 1]
			, xpath
			, charkey = defaults.charkey
			, attrkey = defaults.attrkey
		delete obj["#name"]
		if (obj[charkey].match(/^\s*$/)) {
			delete obj[charkey]
		} else {
			if (defaults.trim) {
		    		obj[charkey] = obj[charkey].trim()
		  	}
		  	if (defaults.normalize) {
		    		obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim()
		  	}
		  	if (Object.keys(obj).length === 1 && charkey in obj && !defaults.explicitCharkey) {
		    		obj = obj[charkey]
		  	}
		}
		if (defaults.emptyTag !== void 0 && isEmpty(obj)) {
			obj = defaults.emptyTag
		}
/*		if (defaults.validator != null) {
			xpath = "/" + ((function() {
		    		var _i, _len, _results = [];
		    		for (_i = 0, _len = stack.length; _i < _len; _i++) {
		      			node = stack[_i]
		      			_results.push(node["#name"])
		    		}
		    		return _results
		  	})()).concat(nodeName).join("/")
		  	try {
		    		obj = defaults.validator(xpath, s && s[nodeName], obj);
		  	} catch (err) {
		     		cb(err)
		  	}
		}
*/
		if (defaults.explicitChildren && !defaults.mergeAttrs && typeof obj === 'object') {
		  	node = {}
		  	if (attrkey in obj) {
		    		node[attrkey] = obj[attrkey]
		    		delete obj[attrkey]
		  	}
		  	if (!defaults.charsAsChildren && charkey in obj) {
		    		node[charkey] = obj[charkey]
		    		delete obj[charkey]
		  	}
		  	if (Object.getOwnPropertyNames(obj).length > 0) {
		    		node[childkey] = obj
		  	}
		  	obj = node
		}
		if (stack.length > 0) {
			if (!defaults.explicitArray) {
		    		if (!(nodeName in s)) {
		      			return s[nodeName] = obj
		    		} else if (s[nodeName] instanceof Array) {
		      			return s[nodeName].push(obj)
		    		} else {
		      			old = s[nodeName]
		      			s[nodeName] = [old]
		      			return s[nodeName].push(obj)
		    		}
		  	} else {
		    		if (!(s[nodeName] instanceof Array)) {
		      			s[nodeName] = []
		    		}
		    		return s[nodeName].push(obj)
		  	}
		} else {
			if (defaults.explicitRoot) {
		    		old = obj
		    		obj = {}
		    		obj[nodeName] = old
		  	}
		  	out = obj
		}
	})
        this.sax.on('text',textHandle)
	this.sax.on('cdata',textHandle) 
	this.sax.on('error',function(e){
		cb(e)
	})
	this.sax.on('end',function(){
		cb(null,out)
	})
	stream.pipe(this.sax)
}
