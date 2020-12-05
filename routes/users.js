//objective: Set up users router to register & authenticate users with user documents, 
//Objective: Use the new User model and Express sessions, to set up the users router to handle registering, logging into, and logging out from user accounts
//Update users router
const express = require('express');
//.. up one directory
const User = require('../models/user');

const router = express.Router();

/* GET users listing. */
//endpoint
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//endpoint
router.post('/signup', (req, res, next) => {
    //check that the username is not already taken
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                const err = new Error(`User ${req.body.username} already exists!`);
                err.status = 403;
                return next(err);
            } else {
                User.create({
                        username: req.body.username,
                        password: req.body.password
                    })
                    .then(user => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ status: 'Registration Successful!', user: user });
                    })
                    //Catch a rejected promise if something goes wrong  with the create method 
                    .catch(err => next(err));
            }
        })
        //Catch a rejecting promise if something goes wrong with the findOne method
        .catch(err => next(err));
});
//endpoint
router.post('/login', (req, res, next) => {
    //no session being tracked by client user is not logged in
    if (!req.session.user) {
        //start of code from auth function in app.js
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }

        const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const username = auth[0];
        const password = auth[1];
        //check username and password against what is in the database
        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    const err = new Error(`User ${username} does not exist!`);
                    err.status = 401;
                    return next(err);
                } else if (user.password !== password) {
                    const err = new Error('Your password is incorrect!');
                    err.status = 401;
                    return next(err);
                } else if (user.username === username && user.password === password) {
                    req.session.user = 'authenticated';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('You are authenticated!')
                }
            })
            .catch(err => next(err));

    }
    //session already being tracked by client
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated!');
    }
});

//Objective: Remove session when user logs out
router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }
});

module.exports = router;

//Objective: Enable users to access secure resources on the server after authentication. 
//Objective: Use Express Sessions to track users when logged in

// const authHeader = req.headers.authorization;
//removed because it is being handled by user router
// //Checking to see if your application is sending a header to the client
// if (!authHeader) {// res.setHeader('WWW-Authenticate', 'Basic'); removed from app.js handle in the user router //}