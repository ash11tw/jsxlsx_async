# Introduction
This is a simple library to read Microsoft Excel file (.xslx only) asynchronously. It can avoid "out of memory" problem when reading extra large files. Right now it also allow you to "edit" the file (read data first and put the data back to the file) synchronously.  

# Usage


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
		//get cell object instead of pure data
		wb.getSheetByName('yourSheetName',function(err,data){
			if (err){
				//handling err
			}
			
		})
	})
	
 
