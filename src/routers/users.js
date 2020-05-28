const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/users', async (req, res) => {
    // Create a new User
    if (!req.body) {
        res.status(400).send({err: 'Json body is missing.'});
    }
    const user = new User(req.body);
    user.save().then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }
        const token = user.generateAuthToken();
        if (!token || token.length === 0) {
            return res.status(401).send('Unable to generate authentication token.');
        }
        res.status(201).send({user, token});
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/users/login', async (req, res) => {
    //Login a registered user
    try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'});
    }
    const token = await user.generateAuthToken();
    res.send({user, token});
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/users/me/logout', auth, async(req, res)=> {
    //log user out of the application
    try {
        req.user.token = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/users/me/logoutall', auth, async(req, res) => {
    //Log user out of all devices.
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users/me', auth, async(req, res) => {
    //view logged in user profile
    res.send(req.user);
});

module.exports = router;