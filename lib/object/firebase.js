var firebase = require("firebase")

module.exports = class Firebase{
    constructor(){}
    
    getFirebase(){return firebase}
    
    init(){
        firebase.initializeApp({
            serviceAccount: "./key/crawler-helper-7931ce4a58df.json",
            databaseURL: "https://crawler-helper.firebaseio.com/" 
        })
    }
}