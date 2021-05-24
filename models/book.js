var mongoose = require('mongoose');

//Books Schema 定义了Genre（类型）的模式，模式是这样
var bookSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    genre:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    author:{
        type:String,
        required: true
    },
    publisher:{
        type:String,
    },
    pages:{
        type:String,
    },
    image_url:{
        type:String,
    },
    buy_url:{
        type:String,
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

//定义model对象来针对modelname集合进行操作 实例化了一个mongoose的model来对数据集进行操作
var book = module.exports = mongoose.model('Book', bookSchema) //这样就可以对数据库Book中的document进行增删改查了

// Get Books 对外暴露接口,这里将function(callback,limit)函数命名为getGenres 这里callback和limit还是不懂怎么回事
module.exports.getBook = function(callback, limit){
    Book.find(callback).limit(limit);
}

// Get Bookid
module.exports.getBookById = function(id, callback){
    Book.findById(id, callback);
}

//Add Book
module.exports.addBook = function(book, callback){
    Book.create(book, callback);
}

//Update BOOK
module.exports.updateBook = function(id, book, options,callback){
    var query = {_id: id};
    var update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url,
        buy_url: book.buy_url
    }
    Book.findOneAndUpdate(query, update, options,callback);
}

//Delete Book
module.exports.deleteBook = function(id, callback){
    var query = {_id: id};
    Book.remove(query, callback);
}
