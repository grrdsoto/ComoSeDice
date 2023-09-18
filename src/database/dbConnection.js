/**
 * This file creates two functions connectToDb and getDb.
 * connectToDb: gets the connection to the database, uri, and stores the connection in dbConnection.
 * getDb: will get the connection from dbConnection so we can use in other files. 
 */

const { MongoClient } = require('mongodb')

let dbConnection
let uri = "mongodb+srv://santoshernandezr:1206825Rs@comosedicecluster.gpnkhsv.mongodb.net/ComoSeDiceGame?retryWrites=true&w=majority"

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}