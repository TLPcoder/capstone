'use strict';
const express = require('express');
const router = express.Router();
var knex = require('../knex');
var fetch = require('node-fetch');

router.get('/:time', function(req, res) {
    var time = req.params.time;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.state', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id','auction.top_bid','courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .orderBy('auction.tee_time', time)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/country/:searchCountry/:time', function(req,res){
    var country = req.params.searchCountry;
    var time = req.params.time;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.course_id','auction.top_bid','auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('courses.country', country)
        .orderBy('auction.tee_time', time)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/state/:searchState/:time', function(req,res){
    var country = req.params.searchState;
    var time = req.params.time;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('courses.state', country)
        .orderBy('auction.tee_time', time)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/city/:searchCity/:time', function(req,res){
    var country = req.params.searchCity;
    var time = req.params.time;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('courses.city', country)
        .orderBy('auction.tee_time', time)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/:postalcode/:distance/:time', function(req, res) {
    var params = req.params;
    var zipCodeCity = [];
    var time = req.params.time;
    var url = `http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${params.postalcode}&country=US&radius=${params.distance}&username=tlpcoder`;
    fetch(url)
        .then(data => {
            var json = data.json();
            return json;
        })
        .then(json => {
            console.log("json", json);
            json.postalCodes.forEach(function(city){
                zipCodeCity.push(city.placeName);
            });
            console.log("zip codes", zipCodeCity);
            knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.top_bid', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
                .from('auction')
                .innerJoin('courses', 'courses.id', 'auction.course_id')
                .innerJoin('users', 'users.id', 'auction.owner_id')
                .innerJoin('bids', 'bids.auction_id', 'auction.id')
                .where('bids.bid_amount', knex.raw('auction.top_bid'))
                .whereIn('courses.city', zipCodeCity)
                .orderBy('auction.tee_time', time)
                .then(function(data) {
                    console.log("course data", data);
                    res.json(data);
                });
        }).catch(function(err) {
            console.log(err);
        });
});

//-----------------------------------------sort by current max bid and tee time
router.get('/:time/:price', function(req, res) {
    var time = req.params.time;
    var price = req.params.price;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country', 'courses.state', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id','auction.top_bid','courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .orderBy('auction.tee_time', time)
        .orderBy('auction.tee_time', price)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/country/:searchCountry/:time/:price', function(req,res){
    var country = req.params.searchCountry;
    var time = req.params.time;
    var price = req.params.price;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.course_id','auction.top_bid','auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('courses.country', country)
        .orderBy('auction.tee_time', time)
        .orderBy('auction.tee_time', price)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/state/:searchState/:time/:price', function(req,res){
    var country = req.params.searchState;
    var time = req.params.time;
    var price = req.params.price;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('courses.state', country)
        .orderBy('auction.tee_time', time)
        .orderBy('auction.tee_time', price)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/city/:searchCity/:time/:price', function(req,res){
    var country = req.params.searchCity;
    var time = req.params.time;
    var price = req.params.price;
    knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip','courses.state','auction.course_id','auction.top_bid', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
        .from('auction')
        .innerJoin('courses', 'courses.id', 'auction.course_id')
        .innerJoin('users', 'users.id', 'auction.owner_id')
        .innerJoin('bids', 'bids.auction_id', 'auction.id')
        .where('bids.bid_amount', knex.raw('auction.top_bid'))
        .where('courses.city', country)
        .orderBy('auction.tee_time', time)
        .orderBy('auction.tee_time', price)
        .then(function(data) {
            res.json(data);
        });
});

router.get('/:postalcode/:distance/:time/:price', function(req, res) {
    var params = req.params;
    var zipCodeCity = [];
    var time = req.params.time;
    var price = req.params.price;
    var url = `http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=${params.postalcode}&country=US&radius=${params.distance}&username=tlpcoder`;
    fetch(url)
        .then(data => {
            var json = data.json();
            return json;
        })
        .then(json => {
            console.log("json", json);
            json.postalCodes.forEach(function(city){
                zipCodeCity.push(city.placeName);
            });
            console.log("zip codes", zipCodeCity);
            knex.select('courses.name', 'courses.description', 'courses.city', 'courses.country','courses.zip', 'courses.state','auction.top_bid', 'auction.course_id', 'auction.tee_time', 'auction.auction_ends', 'auction.owner_id', 'courses.image', 'users.username', 'bids.bider_id', 'bids.bid_amount')
                .from('auction')
                .innerJoin('courses', 'courses.id', 'auction.course_id')
                .innerJoin('users', 'users.id', 'auction.owner_id')
                .innerJoin('bids', 'bids.auction_id', 'auction.id')
                .where('bids.bid_amount', knex.raw('auction.top_bid'))
                .whereIn('courses.city', zipCodeCity)
                .orderBy('auction.tee_time', time)
                .orderBy('auction.tee_time', price)
                .then(function(data) {
                    console.log("course data", data);
                    res.json(data);
                });
        }).catch(function(err) {
            console.log(err);
        });
});
module.exports = router;
