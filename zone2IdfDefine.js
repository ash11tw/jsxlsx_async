module.exports = {
	'Light Pwr':function(zo){
		var o = [
		'Lights',
		zo['Zone Name']+'_Lights',
		zo['Zone Name'] /'ZoneList3_Light_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		'BLDG_LIGHT_SCH_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		zo['Light Unit']=='W'?'LightingLevel':(zo['Light Unit']=='W/m2'?'Watts/Area':(zo['Light Unit']=='W/occ'?'Watts/Person')),
		zo['Light Unit']=='W'?zo['Light Pwr']:'',
		zo['Light Unit']=='W/m2'?zo['Light Pwr']:'',
		zo['Light Unit']=='W/occ'?zo['Light Pwr']:'',
		zo['Light %RA'],
		0.7,
		0.2,
		1
		]
		return o
	}}
	,'TaskLgt Pwr':function(zo){
		var o = [
		'Lights',
		zo['Zone Name']+'_TaskLgt',
		zo['Zone Name'] /'ZoneList4_TaskLgt_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		'BLDG_TASKLGT_SCH_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		zo['TaskLgt Unit']=='W'?'LightingLevel':(zo['TaskLgt Unit']=='W/m2'?'Watts/Area':(zo['TaskLgt Unit']=='W/occ'?'Watts/Person')),
		zo['TaskLgt Unit']=='W'?zo['TaskLgt Pwr']:'',
		zo['TaskLgt Unit']=='W/m2'?zo['TaskLgt Pwr']:'',
		zo['TaskLgt Unit']=='W/occ'?zo['TaskLgt Pwr']:'',
		0,
		0.7,
		0.2,
		1
		]
		return o
	}}
	,'Occ Num':function(zo){
		var o = [
		'People',
		zo['Zone Name']+'_People',
		zo['Zone Name'] /'ZoneList5_Occ_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		'BLDG_PEOPLE_SCH_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		zo['Occ Unit']=='occ'?'People':(zo['Occ Unit']=='occ/m2'?'People/Area':(zo['Occ Unit']=='m2/occ'?'Area/People')),
		zo['Occ Unit']=='occ'?zo['Occ Num']:'',
		zo['Occ Unit']=='occ/m2'?zo['Occ Num']:'',
		zo['Occ Unit']=='m2/occ'?zo['Occ Num']:'',
		0.3,
		zo['Occ SHR'],
		zo['Zone Name']+’_ActivityLvSch’
		]
		return o
	}}
	,'Equip Pwr':function(zo){
		var o = [
		'ElectricEquipment',
		zo['Zone Name']+'_PlugEquip',
		zo['Zone Name'] /'ZoneList6_Equip_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		'BLDG_PLUGEQUIP_SCH_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		zo['Equip Unit']=='W'?'EquipmentLevel':(zo['Equip Unit']=='W/m2'?'Watts/Area':(zo['Equip Unit']=='W/occ'?'Watts/Person')),
		zo['Equip Unit']=='W'?zo['Equip Pwr']:'',
		zo['Equip Unit']=='W/m2'?zo['Equip Pwr']:'',
		zo['Equip Unit']=='W/occ'?zo['Equip Pwr']:'',
		1-zo['Equip SHR'],
		0.5,
		0
		]
		return o
	}}
	,'ZoneInfiltration:DesignFlowRate':function(zo){
		var o = [
		'ZoneInfiltration:DesignFlowRate',
		zo['Zone TemplGroup'] : zo['Zone TemplName']+'_Infiltration',
		zo['Zone Name'],
		'INFIL_SCH_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		zo['Inf Clg Dsn ACH']!=''?'AirChanges/Hour':(zo['Inf Clg Dsn L/S/m2']!=''?'Flow/ExteriorWallArea'),
		zo['Inf Clg Dsn L/S/m2']/1000,
		zo['Inf Clg Dsn ACH'],
		1,
		0,
		0,
		0
		]
		return o
	}}
	,'DesignSpecification:OutdoorAir':function(zo){
		var o = [
		'DesignSpecification:OutdoorAir',
		zo['Zone Name']+'_OA Dsn Spec',
		'Sum' / 'AirChanges/Hour',
		zo['Min OA Rp'] * zo['Occ Num'],
		zo['Min OA Ra'] * zo['Area'],
		zo['Min OA ACH']
		]
		return o
	}}
	,'DesignSpecification:ZoneAirDistibution':function(zo){
		var o = [
		'DesignSpecification:ZoneAirDistibution',
		zo['Zone Name']+'_ZnAirDist Dsn Spec',
		zo['OA EZ Vent Eff'],
		zo['OA EZ Vent Eff']
		]
		return o
	}}
	,'Sizing:Zone':function(zo){
		var o = [
		'Sizing:Zone',
		zo['Zone Name'],
		'SupplyAirTemperature',
		zo['Dsn SA Clg Temp'],
		'SupplyAirTemperature',
		zo['Dsn SA Htg Temp'],
		zo['Dsn SA Clg Humid'],
		zo['Dsn SA Htg Humid'],
		zo['Zone Name']+'_OA Dsn Spec',
		zo['Zone Name']+'_ZnAirDist Dsn Spec'
		]
		return o
	}}
	,'ThermostatSetpoint:SingleHeating':function(zo){
		var o = [
		'ThermostatSetpoint:SingleHeating',
		zo['Zone Name']+'_SingleHtgSetPt',
		zo['Zone Name']+'_SingleHtgSetPt_Sch'
		]
		return o
	}}
	,'ThermostatSetpoint:SingleCooling':function(zo){
		var o = [
		'ThermostatSetpoint:SingleCooling',
		zo['Zone Name']+'_SingleClgSetPt',
		zo['Zone Name']+'_SingleClgSetPt_Sch'
		]
		return o
	}}
	,'ThermostatSetpoint:DualSetpoint':function(zo){
		var o = [
		'ThermostatSetpoint:DualSetpoint',
		zo['Zone Name']+'_DualSetPt',
		zo['Zone Name']+'_SingleHtgSetPt_Sch',
		zo['Zone Name']+'_SingleClgSetPt_Sch'
		]
		return o
	}}
	,'ZoneControl:Thermostat':function(zo){
		var o = [
		'ZoneControl:Thermostat',
		zo['Zone Name']+'_Thermostat',
		zo['Zone Name'] / 'ZoneList7_Tstat_'+zo['Zone TemplGroup']+' : '+zo['Zone TemplName'],
		zo['Zone Name']+'_ControlTypeSch',
		'ThermostatSetpoint:SingleHeating' / 'ThermostatSetpoint:SingleCooling' / 
'ThermostatSetpoint:DualSetpoint',
		zo['Zone Name']+'_SingleHtgSetPt or SingleClgSetPt or DualSetPt'
		]
		return o
	}}
	,'ZoneControl:Humidistat':function(zo){
		var o = [
		'ZoneControl:Humidistat',
		zo['Zone Name']+'_Humidistat',
		zo['Zone Name'],
		'MinRelHumSetSch_'+zo['Dsn Space Htg RH'],
		'MaxRelHumSetSch_'+zo['Dsn Space Clg RH']
		]
		return o
	}}
}