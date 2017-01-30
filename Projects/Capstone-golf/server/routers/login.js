"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');


router.get("/", function(req, res) {
    res.render('../views/login');
});
router.get('/logout', function(req,res){
    res.render('../views/logout');
});

router.post('/login', function(req, res) {
    var body = req.body;
    knex('users').returning('*')
        .where({
            username: body.username,
            hashed_password: body.password
        })
        .then(function(data) {
            if (data.length === 0) {
                res.send("not a member");
            }
            if (!req.cookies.id) {
                console.log("just gave you a cookie");
                res.cookie('id', data[0].id, {
                    httpOnly: true
                });
            }else{
                console.log("you have a cookie");
            }
            res.render('../views/logout')
        });
});

router.post('/logout', function(req, res){
    res.clearCookie('id');
    res.send("cleared your cookie");
    console.log("cleared your cookie");
});

module.exports = router;
