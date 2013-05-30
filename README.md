# Jsxlsx async
## Introduction
This is a simple library to read Microsoft Excel file (.xslx only) asynchronously. It can avoid "out of memory" problem when reading extra large files. Right now it also allow you to "edit" the file (read data first and put the data back to the file) synchronously.  

## Usage


	var xlsx= require('../index')
	xlsx('/yourpath',function(err,wb){
		if (err){
			//handling err
		}
		//get data array 
		wb.getSheetDataByName('yourSheetName',function(err,data){
			if (err){
				//handling err
			}
			console.log(data)
		})
		//get sheet object instead of pure data array
		wb.getSheetByName('yourSheetName',function(err,sheet){
			if (err){
				//handling err
			}
			//get certain cell object from sheet
			//ref can be {row:Number,col:Number} or Excel style string (like A2)
			var cell = sheet.getCell(ref)
			
			//With cell object, you can get Value
			var value = cell.value
			//get Cell type
			var type = cell.type
			//get Cell formula (if any)
			var formula = cell.formula
		
			//get rows array
			var rows = sheet.rows
			//get cells array
			var cells = rows[0].cells	
			
			//Write back to the sheet
			//Warning: this is not asynchronous function. It would probably fail for the large file. 
			wb.updateSheet(sheet,'yourSheetName')
			wb.output(filename)
		})
	})
	
## License
Copyright (c) 2013 Kyle Lu
Licensed under the [MIT license](LICENSE-MIT "MIT License"). 
