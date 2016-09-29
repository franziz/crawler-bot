var FinderFactory = require("./lib/factory/finder")
var Database      = require("./lib/object/database")
var Firebase      = require("./lib/object/firebase")

function runMonitor(){
    let factory = new FinderFactory()
    let finder  = factory.getFinder(factory.CRAWLER_META)

    finder.findAll(function(documents){
        for(var a=0;a<documents.length;a++){
            documents[a].updateStatus()
        }
    })
}

let firebase = new Firebase()
firebase.init()

setInterval(runMonitor,5*60*1000)

