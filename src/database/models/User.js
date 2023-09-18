/**
 * Schema for "User" collection in ComoSeDiceGame database.
 */

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    username: String,
    password: String,
    normalGameMode: {
        bestScore: String,
        gamesPlayed: String
    },
    timedGameMode: {
        bestScore: String,
        gamesPlayed: String
    },
    signedIn: Boolean
})

// Here we are adding the model to an existing collection "Users" (3rd parameter) 
const userModel = mongoose.model("User", UserSchema, "Users")

// Exporting to be used in other files.
module.exports = userModel