var fs = require('fs')
    , unzip = require('unzip')
        , Promise = require("promised-io/promise")

require('node-zip')

var  SimpleParser = require('./libs/simpleParser')
    , Parser = require('./libs/parser')
    , ToXML = require('./libs/toXML')
    , Xml2js = require('./libs/xml2js')
    , U = require('./libs/utils')



module.exports = function(file,cb){
    var me = this,  _sheets, _sharedStrings, _originalSharedStrings, zipper
        , deferred1 = new Promise.Deferred()
        , deferred2 = new Promise.Deferred()
        , deferred3 = new Promise.Deferred()
        , workbook = {
            getSheetDataByName:function(name,cb){
                if (_sheets && _sheets.hasOwnProperty(name)){
                    fs.createReadStream(file)
                    .pipe(unzip.Parse())
                    .on('entry', function(entry) {
                        if (entry.path == _sheets[name].path){
                            Xml2js(entry,function(err,data){
                                var sheet = SimpleParser.parse(data,_sharedStrings)
                                cb(null,sheet)
                            })
                        }
                        entry.autodrain()
                    })
                }else {
                    cb('Cannot find the related sheet.')
                }
            }
            , getSheetByName:function(name,cb){
                var me = this
                if (_sheets && _sheets.hasOwnProperty(name)){
                    fs.createReadStream(file)
                    .pipe(unzip.Parse())
                    .on('entry', function(entry) {
                        if (entry.path == _sheets[name].path){
                            Xml2js(entry,function(err,data){
                                var sheet = Parser.parse(data,_sharedStrings)
                                cb(null,sheet)
                            })
                        }
                        entry.autodrain()
                    })
                }else {
                    cb('Cannot find the related sheet.')
                }
            }
            , getSheetNames:function(){
                var name, names = []
                for(name in _sheets){
                    names.push(name)
                }
                return names
            }
            /*
            * @param object the sheet data
            * @param string sheet name
            */
            , updateSheet:function(data,sheetName){
                var out = Parser.output(data,_originalSharedStrings,_sharedStrings)
                , xlsx
        fs.writeFile('/home/luk/Documents/jsxlsx/1.txt',ToXML(out),function(er){
            if (er) console.log(er)
        })

                if (!zipper){
                    xlsx = fs.readFileSync(file,'binary')
                    zipper = new JSZip(xlsx,{base64:false,checkCRC32:true})
                }
                zipper.file('xl/sharedStrings.xml',ToXML(_originalSharedStrings))

                if (_sheets[sheetName]){
                    zipper.file(_sheets[sheetName].path,ToXML(out))
                }else {
                    //TODO: create a new sheet
                    throw "the library cannot create a new sheet yet"
                }

            }
            , output:function(file){
                var data = zipper.generate({type:'string',compression:'DEFLATE'})
                fs.writeFileSync(file, data, 'binary')
            }
        }
    //loading excel file
    if (file && typeof file === 'string' && fs.existsSync(file)){
        var unz = unzip.Parse()
        unz.on('error', function(error){
            cb(error);
        });
        unz.on('entry', function(entry) {
            var out = ''
            switch (entry.path){
                case 'xl/_rels/workbook.xml.rels':
                    Xml2js(entry,function(err,data){
                        var reference = {}
                        data.Relationships.Relationship.forEach(function(ref){
                            reference[ref.$.Id] = ref.$.Target
                        })
                        deferred1.resolve(reference)

                    })
                    break
                case 'xl/workbook.xml':
                    Xml2js(entry,function(err,data){
                        var out = {}
                        Promise.when(deferred1.promise,function(reference){
                            data.workbook.sheets[0].sheet.forEach(function(sheet){
                                out[sheet.$.name] = {
                                    sheetId:sheet.$.sheetId
                                    , path:'xl/'+reference[sheet.$['r:id']]
                                }
                            })
                            deferred2.resolve(out)
                        })

                    })
                    break
                case 'xl/sharedStrings.xml':
                    Xml2js(entry,function(err,data){
                        var out = []
                        data.sst.si.forEach(function(string){
                            if (string.t){
                                //for the case that includes xml:preserve attribute
                                out.push(U.getRichValue(string.t))
                            //rich text
                            }else if (string.r) {
                                out.push(U.getRichValue(string.r))
                            }
                        })

                        _originalSharedStrings = data
                        deferred3.resolve(out)
                    })
                    break
                default:
            }
            entry.autodrain()
        })
        fs.createReadStream(file)
        .pipe(unz)

        Promise.all(deferred2.promise,deferred3.promise).then(function(values){
            _sheets = values[0]
            _sharedStrings = values[1]
            cb(null,workbook)
        },function(err){cb(err)})
    }else {
        cb("file is required")
    }
}