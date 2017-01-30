"use strict";
const express = require('express');
const router = express.Router();
var knex = require('../knex');

router.get('/', function(req,res){
    knex.select('courses.name','courses.description','courses.city','courses.country','courses.state','auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'users.username','bids.bider_id', 'bids.bid_amount')
    .from('auction')
    .innerJoin('courses', 'courses.id', 'auction.course_id')
    .innerJoin('users' , 'users.id', 'auction.owner_id')
    .innerJoin('bids', 'bids.auction_id', 'auction.id')
    .then(function(data){
        res.send(data);
    });
});


module.exports = router;
