module.exports = {
	"ZONE":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Zone,'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Zone #']+"   ! Space(s): "+hhaObject['Space Name']
		o.N1 = hhaObject['R25']
		o.N2 = +hhaObject['Origin-X']/1000
		o.N3 = +hhaObject['Origin Y']/1000
		o.N4 = +hhaObject['Origin Z']/1000
		o.N5 = 1
		o.N6 = 1
		o.N7 = +hhaObject['Ceiling Height']/1000
		o.N8 = (+hhaObject['Ceiling Height'] * +hhaObject['Area'])/1000000
		o.N9 = +hhaObject['Area']/1000000
		o.A2 = "From LOADS DEFAULTS"
		o.A3 = "From LOADS DEFAULTS"
		o.A4 = "Yes"
		cb(o)
	}
	, methods : {"getDrawingRotation":"R25"}
	,"ZONE-PLENUM":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Zone,'

		o.A1 = hhaObject['Blank-Zone #']+"   ! Space(s): "+hhaObject['Plenum Name']
		o.N1 = hhaObject['R79']
		o.N2 = +hhaObject['Origin-X']
		o.N3 = +hhaObject['Origin-Y']
		o.N4 = +hhaObject['Origin-Z'] + hhaObject['R82']
		o.N5 = 1
		o.N6 = 1
		o.N7 = "autocalculate"
		o.N8 = "autocalculate"
		o.N9 = +hhaObject['Area']/1000000
		o.A2 = ""
		o.A3 = ""
		o.A4 = "No"
		cb(o)
	}
	, methods : {"getDrawingRotation":"R79","getBuildingElev":"R82"}
	,"ADIABATIC WALL":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Wall:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Wall Name']
		o.A2 = "Adb. Wal Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Adiabatic"
		o.A5 = ""
		o.A6 = "NoSun"
		o.A7 = "NoWind"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']/1000
		o.N5 = +hhaObject['Vertex-1-z']/1000
		o.N6 = +hhaObject['Vertex-2-x']/1000
		o.N7 = +hhaObject['Vertex-2-y']/1000
		o.N8 = +hhaObject['Vertex-2-z']/1000
		o.N9 = +hhaObject['Vertex-3-x']/1000
		o.N10 = +hhaObject['Vertex-3-y']/1000
		o.N11 = +hhaObject['Vertex-3-z']/1000
		o.N12 = +hhaObject['Vertex-4-x']/1000
		o.N13 = +hhaObject['Vertex-4-y']/1000
		o.N14 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"INTERZONE WALL":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Wall:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Wall Name']
		o.A2 = "Interzone Wall Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Surface"
		o.A5 = hhaObject['Floor #']+"-"+hhaObject['Other Surface Name']
		o.A6 = "NoSun"
		o.A7 = "NoWind"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']/1000
		o.N5 = +hhaObject['Vertex-1-z']/1000
		o.N6 = +hhaObject['Vertex-2-x']/1000
		o.N7 = +hhaObject['Vertex-2-y']/1000
		o.N8 = +hhaObject['Vertex-2-z']/1000
		o.N9 = +hhaObject['Vertex-3-x']/1000
		o.N10 = +hhaObject['Vertex-3-y']/1000
		o.N11 = +hhaObject['Vertex-3-z']/1000
		o.N12 = +hhaObject['Vertex-4-x']/1000
		o.N13 = +hhaObject['Vertex-4-y']/1000
		o.N14 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"CEILING":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'RoofCeiling:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Ceiling Name']
		o.A2 = "Ceiling Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Zone"
		o.A5 = hhaObject['Floor #']+"-"+hhaObject['Other Zone Name']
		o.A6 = "NoSun"
		o.A7 = "NoWind"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']/1000
		o.N5 = +hhaObject['Vertex-1-z']/1000
		o.N6 = +hhaObject['Vertex-2-x']/1000
		o.N7 = +hhaObject['Vertex-2-y']/1000
		o.N8 = +hhaObject['Vertex-2-z']/1000
		o.N9 = +hhaObject['Vertex-3-x']/1000
		o.N10 = +hhaObject['Vertex-3-y']/1000
		o.N11 = +hhaObject['Vertex-3-z']/1000
		o.N12 = +hhaObject['Vertex-4-x']/1000
		o.N13 = +hhaObject['Vertex-4-y']/1000
		o.N14 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"ADIABATIC FLOOR":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Floor:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Floor Name']
		o.A2 = "Adiabatic Floor Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Zone"
		o.A5 = hhaObject['Floor #']+"-"+hhaObject['Other Zone Name']
		o.A6 = "NoSun"
		o.A7 = "NoWind"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']/1000
		o.N5 = +hhaObject['Vertex-1-z']/1000
		o.N6 = +hhaObject['Vertex-2-x']/1000
		o.N7 = +hhaObject['Vertex-2-y']/1000
		o.N8 = +hhaObject['Vertex-2-z']/1000
		o.N9 = +hhaObject['Vertex-3-x']/1000
		o.N10 = +hhaObject['Vertex-3-y']/1000
		o.N11 = +hhaObject['Vertex-3-z']/1000
		o.N12 = +hhaObject['Vertex-4-x']/1000
		o.N13 = +hhaObject['Vertex-4-y']/1000
		o.N14 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"INTERZONE FLOOR":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Floor:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Floor Name']
		o.A2 = "Interzone Floor Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Zone"
		o.A5 = hhaObject['Floor #']+"-"+hhaObject['Other Zone Name']
		o.A6 = "NoSun"
		o.A7 = "NoWind"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']/1000
		o.N5 = +hhaObject['Vertex-1-z']/1000
		o.N6 = +hhaObject['Vertex-2-x']/1000
		o.N7 = +hhaObject['Vertex-2-y']/1000
		o.N8 = +hhaObject['Vertex-2-z']/1000
		o.N9 = +hhaObject['Vertex-3-x']/1000
		o.N10 = +hhaObject['Vertex-3-y']/1000
		o.N11 = +hhaObject['Vertex-3-z']/1000
		o.N12 = +hhaObject['Vertex-4-x']/1000
		o.N13 = +hhaObject['Vertex-4-y']/1000
		o.N14 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"GROUND FLOOR":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Floor:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Floor Name']
		o.A2 = "On-grade Floor Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "GroundFCfactorMethod"
		o.A5 = ""
		o.A6 = "NoSun"
		o.A7 = "NoWind"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']/1000
		o.N5 = +hhaObject['Vertex-1-z']/1000
		o.N6 = +hhaObject['Vertex-2-x']/1000
		o.N7 = +hhaObject['Vertex-2-y']/1000
		o.N8 = +hhaObject['Vertex-2-z']/1000
		o.N9 = +hhaObject['Vertex-3-x']/1000
		o.N10 = +hhaObject['Vertex-3-y']/1000
		o.N11 = +hhaObject['Vertex-3-z']/1000
		o.N12 = +hhaObject['Vertex-4-x']/1000
		o.N13 = +hhaObject['Vertex-4-y']/1000
		o.N14 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"EXTERIOR WALL":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Wall:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Wall Name']
		o.A2 = "Ext. Wall Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Outdoors"
		o.A5 = ""
		o.A6 = "SunExposed"
		o.A7 = "WindExposed"
		o.N1 = "autocalculate"
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']
		o.N5 = +hhaObject['Vertex-1-z']
		o.N6 = +hhaObject['Vertex-2-x']
		o.N7 = +hhaObject['Vertex-2-y']
		o.N8 = +hhaObject['Vertex-2-z']
		o.N9 = +hhaObject['Vertex-3-x']
		o.N10 = +hhaObject['Vertex-3-y']
		o.N11 = +hhaObject['Vertex-3-z']
		o.N12 = +hhaObject['Vertex-4-x']
		o.N13 = +hhaObject['Vertex-4-y']
		o.N14 = +hhaObject['']
		cb(o)
	}
	,"UNDERGROUND WALL":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'Wall:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Wall Name']
		o.A2 = "Und. Gnd. Wall Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Ground"
		o.A5 = ""
		o.A6 = "NoSun"
		o.A7 = "NoWind"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']
		o.N5 = +hhaObject['Vertex-1-z']
		o.N6 = +hhaObject['Vertex-2-x']
		o.N7 = +hhaObject['Vertex-2-y']
		o.N8 = +hhaObject['Vertex-2-z']
		o.N9 = +hhaObject['Vertex-3-x']
		o.N10 = +hhaObject['Vertex-3-y']
		o.N11 = +hhaObject['Vertex-3-z']
		o.N12 = +hhaObject['Vertex-4-x']
		o.N13 = +hhaObject['Vertex-4-y']
		o.N14 = +hhaObject['']
		cb(o)
	}
	,"FLOOR-LEVEL DEFAULTS":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = ''

		cb(o)
	}
	,"EXTERIOR SHADING SURFACE":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = ''

		cb(o)
	}
	,"ROOF":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'RoofCeiling:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Roof Name']
		o.A2 = "Roof Constr. "+hhaObject['Construction Type']
		o.A3 = hhaObject['Floor #']+"-"+hhaObject['Zone #']
		o.A4 = "Outdoors"
		o.A5 = ""
		o.A6 = "SunExposed"
		o.A7 = "WindExposed"
		o.N1 = 0
		o.N2 = +hhaObject['# vertices']
		o.N3 = +hhaObject['Vertex-1-x']/1000
		o.N4 = +hhaObject['Vertex-1-y']/1000
		o.N5 = +hhaObject['Vertex-1-z']/1000
		o.N6 = +hhaObject['Vertex-2-x']/1000
		o.N7 = +hhaObject['Vertex-2-y']/1000
		o.N8 = +hhaObject['Vertex-2-z']/1000
		o.N9 = +hhaObject['Vertex-3-x']/1000
		o.N10 = +hhaObject['Vertex-3-y']/1000
		o.N11 = +hhaObject['Vertex-3-z']/1000
		o.N12 = +hhaObject['Vertex-4-x']/1000
		o.N13 = +hhaObject['Vertex-4-y']/1000
		o.N14 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"WINDOW":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'FenstrationSurface:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Window Name']
		o.A2 = "Window"
		o.A3 = "Window Construction"+hhaObject['Window Construction Type']
		o.A4 = hhaObject['Floor #']+"-"+hhaObject['Wall Name']
		o.A5 = ""
		o.N1 = "autocalculate"
		o.A6 = hhaObject['Shading Control']
		o.A7 = hhaObject['Frame + Divider']
		o.N2 = 1
		o.N3 = +hhaObject['# vertices']
		o.N4 = +hhaObject['Vertex-1-x']/1000
		o.N5 = +hhaObject['Vertex-1-y']/1000
		o.N6 = +hhaObject['Vertex-1-z']/1000
		o.N7 = +hhaObject['Vertex-2-x']/1000
		o.N8 = +hhaObject['Vertex-2-y']/1000
		o.N9 = +hhaObject['Vertex-2-z']/1000
		o.N10 = +hhaObject['Vertex-3-x']/1000
		o.N11 = +hhaObject['Vertex-3-y']/1000
		o.N12 = +hhaObject['Vertex-3-z']/1000
		o.N13 = +hhaObject['Vertex-4-x']/1000
		o.N14 = +hhaObject['Vertex-4-y']/1000
		o.N15 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
	,"DOOR":{
	run:function(hhaObject,cb){
		var o = {}
		o.name = 'FenstrationSurface:Detailed'

		o.A1 = hhaObject['Floor #']+"-"+hhaObject['Door Name']
		o.A2 = "Door"
		o.A3 = "Door Construction"+hhaObject['Door Construction Type']
		o.A4 = hhaObject['Floor #']+"-"+hhaObject['Wall Name']
		o.A5 = ""
		o.N1 = "autocalculate"
		o.A6 = hhaObject['Shading Control']
		o.A7 = hhaObject['Frame + Divider']
		o.N2 = 1
		o.N3 = +hhaObject['# vertices']
		o.N4 = +hhaObject['Vertex-1-x']/1000
		o.N5 = +hhaObject['Vertex-1-y']/1000
		o.N6 = +hhaObject['Vertex-1-z']/1000
		o.N7 = +hhaObject['Vertex-2-x']/1000
		o.N8 = +hhaObject['Vertex-2-y']/1000
		o.N9 = +hhaObject['Vertex-2-z']/1000
		o.N10 = +hhaObject['Vertex-3-x']/1000
		o.N11 = +hhaObject['Vertex-3-y']/1000
		o.N12 = +hhaObject['Vertex-3-z']/1000
		o.N13 = +hhaObject['Vertex-4-x']/1000
		o.N14 = +hhaObject['Vertex-4-y']/1000
		o.N15 = +hhaObject['Vertex-4-z']/1000
		cb(o)
	}
}
