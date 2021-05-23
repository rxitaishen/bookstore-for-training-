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

//定义model对象来针对modelname集合进行操作 还是不懂这里model是什么 等会去查查官方文档
var book = module.exports = mongoose.model('Book', bookSchema) //这样就可以对数据库Genre中的document进行增删改查了

// Get Genres 对外暴露接口,这里将function(callback,limit)函数命名为getGenres 这里callback和limit还是不懂怎么回事
module.exports.getBook = function(callback, limit){
    Book.find(callback).limit(limit);
}