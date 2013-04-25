module.exports = {
	"ZONE":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Zone,)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #']+"   ! Space(s): "+hhaObject['Space Name'])
		o.push(hhaObject['R64'])
		o.push(+hhaObject['Origin-X']/1000)
		o.push(+hhaObject['Origin Y']/1000)
		o.push(+hhaObject['Origin Z']/1000)
		o.push(1)
		o.push(1)
		o.push(+hhaObject['Ceiling Height']/1000)
		o.push((+hhaObject['Ceiling Height'] * +hhaObject['Area'])/1000000)
		o.push(+hhaObject['Area']/1000000)
		o.push("From LOADS DEFAULTS")
		o.push("From LOADS DEFAULTS")
		o.push("Yes")
		cb(o,hhaObject)
	}
	, methods : {"getDrawingRotation":"R64"}
	}
	,"ZONE-PLENUM":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Zone,)'

		o.push(hhaObject['Blank-Zone #']+"   ! Space(s): "+hhaObject['Plenum Name'])
		o.push(hhaObject['R61'])
		o.push(+hhaObject['Origin-X'])
		o.push(+hhaObject['Origin-Y'])
		o.push(+hhaObject['Origin-Z'] + hhaObject['R20'])
		o.push(1)
		o.push(1)
		o.push("autocalculate")
		o.push("autocalculate")
		o.push(+hhaObject['Area']/1000000)
		o.push("")
		o.push("")
		o.push("No")
		cb(o,hhaObject)
	}
	, methods : {"getDrawingRotation":"R61","getBuildingElev":"R20"}
	}
	,"ADIABATIC WALL":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Wall:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Wall Name'])
		o.push("Adb. Wal Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Adiabatic")
		o.push("")
		o.push("NoSun")
		o.push("NoWind")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		o.push(+hhaObject['Vertex-1-x']/1000)
		o.push(+hhaObject['Vertex-1-y']/1000)
		o.push(+hhaObject['Vertex-1-z']/1000)
		o.push(+hhaObject['Vertex-2-x']/1000)
		o.push(+hhaObject['Vertex-2-y']/1000)
		o.push(+hhaObject['Vertex-2-z']/1000)
		o.push(+hhaObject['Vertex-3-x']/1000)
		o.push(+hhaObject['Vertex-3-y']/1000)
		o.push(+hhaObject['Vertex-3-z']/1000)
		o.push(+hhaObject['Vertex-4-x']/1000)
		o.push(+hhaObject['Vertex-4-y']/1000)
		o.push(+hhaObject['Vertex-4-z']/1000)
		cb(o,hhaObject)
	}
	}
	,"INTERZONE WALL":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Wall:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Wall Name'])
		o.push("Interzone Wall Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Surface")
		o.push(hhaObject['Floor #']+"-"+hhaObject['Other Surface Name'])
		o.push("NoSun")
		o.push("NoWind")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		o.push(+hhaObject['Vertex-1-x']/1000)
		o.push(+hhaObject['Vertex-1-y']/1000)
		o.push(+hhaObject['Vertex-1-z']/1000)
		o.push(+hhaObject['Vertex-2-x']/1000)
		o.push(+hhaObject['Vertex-2-y']/1000)
		o.push(+hhaObject['Vertex-2-z']/1000)
		o.push(+hhaObject['Vertex-3-x']/1000)
		o.push(+hhaObject['Vertex-3-y']/1000)
		o.push(+hhaObject['Vertex-3-z']/1000)
		o.push(+hhaObject['Vertex-4-x']/1000)
		o.push(+hhaObject['Vertex-4-y']/1000)
		o.push(+hhaObject['Vertex-4-z']/1000)
		cb(o,hhaObject)
	}
	}
	,"CEILING":{
	run:function(hhaObject,cb){
		var o = []
		o.push('RoofCeiling:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Ceiling Name'])
		o.push("Ceiling Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Zone")
		o.push(hhaObject['Floor #']+"-"+hhaObject['Other Zone Name'])
		o.push("NoSun")
		o.push("NoWind")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		cb(o,hhaObject)
	}
	, repeats : [function(s){ return +s/1000},function(s){ return +s/1000},function(s){ return +s/1000}]
	}
	,"ADIABATIC FLOOR":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Floor:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Floor Name'])
		o.push("Adiabatic Floor Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Zone")
		o.push(hhaObject['Floor #']+"-"+hhaObject['Other Zone Name'])
		o.push("NoSun")
		o.push("NoWind")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		cb(o,hhaObject)
	}
	, repeats : [function(s){ return +s/1000},function(s){ return +s/1000},function(s){ return +s/1000}]
	}
	,"INTERZONE FLOOR":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Floor:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Floor Name'])
		o.push("Interzone Floor Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Zone")
		o.push(hhaObject['Floor #']+"-"+hhaObject['Other Zone Name'])
		o.push("NoSun")
		o.push("NoWind")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		cb(o,hhaObject)
	}
	, repeats : [function(s){ return +s/1000},function(s){ return +s/1000},function(s){ return +s/1000}]
	}
	,"GROUND FLOOR":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Floor:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Floor Name'])
		o.push("On-grade Floor Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("GroundFCfactorMethod")
		o.push("")
		o.push("NoSun")
		o.push("NoWind")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		o.push(+hhaObject['Vertex-1-x']/1000)
		o.push(+hhaObject['Vertex-1-y']/1000)
		o.push(+hhaObject['Vertex-1-z']/1000)
		o.push(+hhaObject['Vertex-2-x']/1000)
		o.push(+hhaObject['Vertex-2-y']/1000)
		o.push(+hhaObject['Vertex-2-z']/1000)
		o.push(+hhaObject['Vertex-3-x']/1000)
		o.push(+hhaObject['Vertex-3-y']/1000)
		o.push(+hhaObject['Vertex-3-z']/1000)
		o.push(+hhaObject['Vertex-4-x']/1000)
		o.push(+hhaObject['Vertex-4-y']/1000)
		o.push(+hhaObject['Vertex-4-z']/1000)
		cb(o,hhaObject)
	}
	}
	,"EXTERIOR WALL":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Wall:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Wall Name'])
		o.push("Ext. Wall Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Outdoors")
		o.push("")
		o.push("SunExposed")
		o.push("WindExposed")
		o.push("autocalculate")
		o.push(+hhaObject['# vertices'])
		o.push(+hhaObject['Vertex-1-x']/1000)
		o.push(+hhaObject['Vertex-1-y'])
		o.push(+hhaObject['Vertex-1-z'])
		o.push(+hhaObject['Vertex-2-x'])
		o.push(+hhaObject['Vertex-2-y'])
		o.push(+hhaObject['Vertex-2-z'])
		o.push(+hhaObject['Vertex-3-x'])
		o.push(+hhaObject['Vertex-3-y'])
		o.push(+hhaObject['Vertex-3-z'])
		o.push(+hhaObject['Vertex-4-x'])
		o.push(+hhaObject['Vertex-4-y'])
		o.push(0)
		cb(o,hhaObject)
	}
	}
	,"UNDERGROUND WALL":{
	run:function(hhaObject,cb){
		var o = []
		o.push('Wall:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Wall Name'])
		o.push("Und. Gnd. Wall Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Ground")
		o.push("")
		o.push("NoSun")
		o.push("NoWind")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		o.push(+hhaObject['Vertex-1-x']/1000)
		o.push(+hhaObject['Vertex-1-y'])
		o.push(+hhaObject['Vertex-1-z'])
		o.push(+hhaObject['Vertex-2-x'])
		o.push(+hhaObject['Vertex-2-y'])
		o.push(+hhaObject['Vertex-2-z'])
		o.push(+hhaObject['Vertex-3-x'])
		o.push(+hhaObject['Vertex-3-y'])
		o.push(+hhaObject['Vertex-3-z'])
		o.push(+hhaObject['Vertex-4-x'])
		o.push(+hhaObject['Vertex-4-y'])
		o.push(0)
		cb(o,hhaObject)
	}
	}
	,"FLOOR-LEVEL DEFAULTS":{
	run:function(hhaObject,cb){
		var o = []

		cb(o,hhaObject)
	}
	}
	,"EXTERIOR SHADING SURFACE":{
	run:function(hhaObject,cb){
		var o = []

		cb(o,hhaObject)
	}
	}
	,"ROOF":{
	run:function(hhaObject,cb){
		var o = []
		o.push('RoofCeiling:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Roof Name'])
		o.push("Roof Constr. "+hhaObject['Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Zone #'])
		o.push("Outdoors")
		o.push("")
		o.push("SunExposed")
		o.push("WindExposed")
		o.push(0)
		o.push(+hhaObject['# vertices'])
		cb(o,hhaObject)
	}
	, repeats : [function(s){ return +s/1000},function(s){ return +s/1000},function(s){ return +s/1000}]
	}
	,"WINDOW":{
	run:function(hhaObject,cb){
		var o = []
		o.push('FenstrationSurface:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Window Name'])
		o.push("Window")
		o.push("Window Construction"+hhaObject['Window Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Wall Name'])
		o.push("")
		o.push("autocalculate")
		o.push(hhaObject['Shading Control'])
		o.push(hhaObject['Frame + Divider'])
		o.push(1)
		o.push(+hhaObject['# vertices'])
		o.push(+hhaObject['Vertex-1-x']/1000)
		o.push(+hhaObject['Vertex-1-y']/1000)
		o.push(+hhaObject['Vertex-1-z']/1000)
		o.push(+hhaObject['Vertex-2-x']/1000)
		o.push(+hhaObject['Vertex-2-y']/1000)
		o.push(+hhaObject['Vertex-2-z']/1000)
		o.push(+hhaObject['Vertex-3-x']/1000)
		o.push(+hhaObject['Vertex-3-y']/1000)
		o.push(+hhaObject['Vertex-3-z']/1000)
		o.push(+hhaObject['Vertex-4-x']/1000)
		o.push(+hhaObject['Vertex-4-y']/1000)
		o.push(+hhaObject['Vertex-4-z']/1000)
		cb(o,hhaObject)
	}
	}
	,"DOOR":{
	run:function(hhaObject,cb){
		var o = []
		o.push('FenstrationSurface:Detailed)'

		o.push(hhaObject['Floor #']+"-"+hhaObject['Door Name'])
		o.push("Door")
		o.push("Door Construction"+hhaObject['Door Construction Type'])
		o.push(hhaObject['Floor #']+"-"+hhaObject['Wall Name'])
		o.push("")
		o.push("autocalculate")
		o.push(hhaObject['Shading Control'])
		o.push(hhaObject['Frame + Divider'])
		o.push(1)
		o.push(+hhaObject['# vertices'])
		o.push(+hhaObject['Vertex-1-x']/1000)
		o.push(+hhaObject['Vertex-1-y']/1000)
		o.push(+hhaObject['Vertex-1-z']/1000)
		o.push(+hhaObject['Vertex-2-x']/1000)
		o.push(+hhaObject['Vertex-2-y']/1000)
		o.push(+hhaObject['Vertex-2-z']/1000)
		o.push(+hhaObject['Vertex-3-x']/1000)
		o.push(+hhaObject['Vertex-3-y']/1000)
		o.push(+hhaObject['Vertex-3-z']/1000)
		o.push(+hhaObject['Vertex-4-x']/1000)
		o.push(+hhaObject['Vertex-4-y']/1000)
		o.push(+hhaObject['Vertex-4-z']/1000)
		cb(o,hhaObject)
	}
	}
}
