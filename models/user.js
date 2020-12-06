//Objective: this this file will set up a new Mongoose Schema and Model for a new 'users' MongoDB collection
//Import our third party middleware
const mongoose = require('mongoose');
//Add passport-local-mongoose plugin to userSchema plugin will handle username and password 
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema; // Use Schema object refer to documentation, to create schema

//importing a third party 
//const passportLocalMongoose = require('passport-local')
//making a schema
const userSchema = new Schema({

    admin: {
        type: Boolean,
        default: false
    }
});

//this is using line 5
//meaning that it will automatically and username and password to your schema 
userSchema.plugin(passportLocalMongoose);

//Create and Export to be used in Database and Client
module.exports = mongoose.model('User', userSchema);