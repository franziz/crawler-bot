var firebase = require("firebase")

module.exports = class Firebase{
    constructor(){
        firebase.initializeApp({
            serviceAccount: "./key/crawler-helper-7931ce4a58df.json",
            databaseURL: "https://crawler-helper.firebaseio.com/" 
        })
        return firebase;
    }
}