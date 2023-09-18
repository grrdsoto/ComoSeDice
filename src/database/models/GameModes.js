/**
 * Schema for "GameModes" collection in ComoSeDiceGame database.
 */

const mongoose = require("mongoose")

const GameModesSchema = new mongoose.Schema({
    gameMode: {
        bestScore: String,
        gamesPlayed: String
    }
})

// Here we are adding the model to an existing collection "Users" (3rd parameter) 
const gameModesModel = mongoose.model("GameModes", GameModesSchema, "Users")

// Exporting to be used in other files.
module.exports = gameModesModel