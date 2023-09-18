const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./dbConnection')

const app = express()
app.use(express.json())

// The variable in which we will store the database connection we get from getDb().
let db

// Establishing connection to the database on port 3000.
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// routes
app.get('/users', (req, res) => {
    let users = []

    db.collection('Users') // returns a cursor which points to query, allows us to use methods like toArray forEach
        .find()
        .sort({ name: 1 })
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch documents' })
        })

    // res.json({ msg: "Welcome to the api" })
})

// gets user with specific id
app.get('/users/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('Users')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.json(500).json({ error: 'Could not getch the documents' })
            })
    } else {
        res.status(500).json({ error: 'Not valid doc id' })
    }
})

// Post to insert new user
app.post('/users', (req, res) => {
    const user = req.body

    db.collection('Users')
        .insertOne(user)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ err: 'Could not create a new document' })
        })
})

// delete user with specific id
app.delete('/users/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('Users')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.json(500).json({ error: 'Could not delete the documents' })
            })
    } else {
        res.status(500).json({ error: 'Not valid doc id' })
    }
})

app.patch('/users/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('Users')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.json(500).json({ error: 'Could not update the documents' })
            })
    } else {
        res.status(500).json({ error: 'Not valid doc id' })
    }
})

// app.get("/insert", (req, res) => {

//     var user = new userModel()
//     user.name = 'Roberto'
//     user.email = 'jocelyn@gmail.com'
//     user.age = '24'
//     user.nickname = 'joci'
//     user.normalGameMode.bestScore = '0'
//     user.normalGameMode.gamesPlayed = '0'
//     user.timedGameMode.bestScore = '0'
//     user.timedGameMode.gamesPlayed = '0'
//     user.signedIn = false

//     user.save()

//     console.log("Saved")
// })

// /**
//  * 
//  * @param {String} name 
//  * @param {String} email 
//  */
// async function createUser(name, email) {
//     const insertUser = async() => {
//         const user = new userModel()
//         user.name = name
//         user.email = email
//         user.age = '24'
//         user.nickname = 'joci'
//         user.normalGameMode.bestScore = '0'
//         user.normalGameMode.gamesPlayed = '0'
//         user.timedGameMode.bestScore = '0'
//         user.timedGameMode.gamesPlayed = '0'
//         user.signedIn = false

//         const doc = await user.save()
//         console.log("Saving" + doc)
//     }

//     insertUser()

//     console.log("From function")
// }