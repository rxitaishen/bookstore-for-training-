var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

//链接到mongoose
mongoose.connect('mongodb://localhost/bookstore')
var db = mongoose.connection;

app.get('/', function (req, res){
    res.send('plz use /api/books or whatever');
})

app.listen(3000);
console.log('running on port 3000');