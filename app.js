var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

//这里不需要文件扩展名.js
Genre = require('./models/genre');
Book = require('./models/book');

//链接到mongoose
mongoose.connect('mongodb://localhost/bookstore');

mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

var db = mongoose.connection;


app.get('/', function (req, res){
    res.send('plz use /api/books or whatever');
})

app.get('/api/genres',function(req, res){
    //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    })
})

app.get('/api/books',function(req, res){
    //之前定义的getbook是一个函数，里面有callback，这里的function就是一个callback函数
    Book.getBook(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    })
})

app.listen(3000);
console.log('running on port 3000');