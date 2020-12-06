const express = require('express');
//.. up one directory
const User = require('../models/user');
//import passport
const passport = require('passport');

const router = express.Router();

/* GET users listing. */
//endpoint
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//endpoint
router.post('/signup', (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        err => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                });
            }
        }
    );
});

//endpoint
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'You are successfully logged in!' });
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