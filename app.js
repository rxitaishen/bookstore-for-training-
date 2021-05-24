var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

app.use(bodyParser.json());

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

app.post('/api/genres',function(req, res){
    //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
    var genre  = req.body;
    Genre.addGenre(genre,function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
})

app.put('/api/genres/:_id',function(req, res){
    //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
    var id = req.params._id;
    var genre  = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    })
})

app.delete('/api/genres/:_id',function(req, res){
    //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
    var id = req.params._id;
    //var book  = req.body; 因为我们没有post东西
    Genre.deleteGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
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

app.get('/api/books/:_id',function(req, res){
    //之前定义的getbook是一个函数，里面有callback，这里的function就是一个callback函数
    Book.getBookById(req.params._id,function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
})

// Add Book
app.post('/api/books',function(req, res){
    //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
    var book  = req.body;
    //book是req.body的实例化对象，好像是一个字典，function(err, book)是addBook定义中的callback函数
    Book.addBook(book,function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
})

app.put('/api/books/:_id',function(req, res){
    //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
    var id = req.params._id;
    var book  = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
})

app.delete('/api/books/:_id',function(req, res){
    //之前定义的getgenres是一个函数，里面有callback，这里的function就是一个callback函数
    var id = req.params._id;
    //var book  = req.body; 因为我们没有post东西
    Book.deleteBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
})

app.listen(3000);
console.log('running on port 3000');