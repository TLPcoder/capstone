'use strict';
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const login = require('./routers/login');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.get("/", function(req,res){
    res.send('hello there');
});

app.use('/login', login);


app.listen(PORT, function(){
    console.log('running on port' + PORT);
});
