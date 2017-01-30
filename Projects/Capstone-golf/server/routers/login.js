"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');


router.get("/", function(req, res) {
    res.render('../views/login');
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
                res.cookie('id', data[0].id, {
                    httpOnly: true
                });
            }else{
                console.log("you have a cookie");
            }
            console.log(req.cookies);
            res.send(data);
        });
});

module.exports = router;
