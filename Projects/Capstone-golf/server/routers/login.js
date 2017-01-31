"use strict";
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const User = require('../models/users');


router.get("/", function(req, res) {
    res.render('../views/login');
});
router.get('/logout', function(req, res) {
    res.render('../views/logout');
});

router.get('/createAccount', function(req, res) {
    res.render('../views/create_account');
});

router.post('/createAccount', function(req, res) {
    var body = req.body;
    var newUser = new User(body.first_name, body.last_name, body.username, body.email, body.password);
    newUser.passwordHash(body.password);

    knex('users').returning('*').insert({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
            email: newUser.email,
            hashed_password: newUser.hashed_password
        })
        .then(function(data) {
            if (!req.cookies.id) {
                console.log("just gave you a cookie");
                res.cookie('id', data[0].id, {
                    httpOnly: true
                });
            } else {
                console.log("for some reason you have a cookie");
            }
            newUser.unhashPassword(body.password);
            res.json(data);
        });
    // res.json(body);
});

router.get('/cookie', function(req, res) {
    res.json({
        member: true,
        id: req.cookies.id
    });
});

router.post('/login', function(req, res) {
    var body = req.body;
    console.log("cookies", req.cookies);
    if (body.password === 'password') {
        console.log("should be here for nonpasswords");
        knex('users').returning('*')
            .where({
                username: body.username,
                hashed_password: body.password
            })
            .then(function(data) {
                if (data.length === 0) {
                    res.json({
                        member: false,
                        cookie: false
                    });
                }
                if (!req.cookies.id) {
                    console.log("just gave you a cookie");
                    res.cookie('id', data[0].id, {
                        httpOnly: true
                    });
                } else {
                    console.log("you have a cookie");
                    res.json({
                        member: true,
                        id: req.cookies.id
                    });
                }
                res.render('../views/logout');
            });
    } else {
        knex('users')
            .returning('*')
            .where('username', body.username)
            .then(function(data) {
                console.log("please be true:",
                    bcrypt.compareSync(body.password, data[0].hashed_password));
                var userExist = bcrypt.compareSync(body.password, data[0].hashed_password);
                if (userExist) {
                    knex('users').returning('*')
                        .where({
                            username: body.username
                        })
                        .then(function(userData) {
                            if (userData.length === 0) {
                                res.json({
                                    member: false,
                                    cookie: false
                                });
                            }
                            if (!req.cookies.id) {
                                console.log("just gave you a cookie");
                                res.cookie('id', userData[0].id, {
                                    httpOnly: true
                                });
                                console.log(req.cookies);
                            } else {
                                console.log("you have a cookie");
                                res.json({
                                    member: true,
                                    cookie: req.cookies.id
                                });
                            }
                            res.redirect('/login/cookie');
                        });
                } else {
                    res.json({
                        user: false
                    });
                }
            });
    }
});

router.post('/logout', function(req, res) {
    res.clearCookie('id');
    res.json({
        cookie: "deleted"
    });
    console.log("cleared your cookie");
});

module.exports = router;
