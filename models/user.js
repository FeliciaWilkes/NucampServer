//Objective: this this file will set up a new Mongoose Schema and Model for a new 'users' MongoDB collection



//Import our third party middleware
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Use Schema object refer to documentation, to create schema

//importing a third party 
//const passportLocalMongoose = require('passport-local')
//making a schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

//this is using line 6
//meaning that it will automatically and username and password to your schema 
//userSchema.plugin();
//Create and Export to be used in Database and Client
module.exports = mongoose.model('User', userSchema);