'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', function(req,res){
    let something = 'users router';
    res.send(something);
});

module.exports = router;
