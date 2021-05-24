var mongoose = require('mongoose');

//Genre Schema 定义了Genre（类型）的模式，模式是这样
var genreSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

//定义model对象来针对modelname集合进行操作 还是不懂这里model是什么 等会去查查官方文档
var Genre = module.exports = mongoose.model('Genre', genreSchema) //这样就可以对数据库Genre中的document进行增删改查了

// Get Genres 对外暴露接口,这里将function(callback,limit)函数命名为getGenres 这里callback和limit还是不懂怎么回事
module.exports.getGenres = function(callback, limit){
    Genre.find(callback).limit(limit);
}

//Add Genre
module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}

//Update Genre
module.exports.updateGenre = function(id, genre, options,callback){
    var query = {_id: id};
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options,callback);
}

//Delete Genre
module.exports.deleteGenre = function(id, callback){
    var query = {_id: id};
    Genre.remove(query, callback);
}