const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre =require('./models/genre');
Book =require('./models/book');
User =require('./models/user')

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', (req, res ) => {
	Genre.getGenres((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//这里开始写user的路由

app.get('/api/users', (req, res ) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.post('/api/users', (req, res) => {
	var user = req.body;
	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.get('/api/users/:name', (req, res) => {
	var name = req.params.name;
	var user = req.body;
	User.getBookByName(name, user, {}, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

/*app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});*/

//应该在这里改变获取books的函数，先在model里改变getbooks的函数，让他变成像找title一样找到匹配的author
//前后端的交流都会通过controller作为桥梁，前端从scope里获取对象，后端响应ctrl里的http请求对数据库进行操作获取值传回ctrl里，由scope捕获，并赋值给被scope声明的对象
//主要问题是要明白表单的提交
//现在还有个问题是管理员权限怎么判断,目前想法是不能添加电影,但怎么判断呢，是不是还要从芒果里获取admin值，在ctrl的scope或者前端的{{}}判断值
//好像初始页是肯定要改的，那这样的话,ng—view那里又要改了，是不是要切换不同的angularmodule还是切换ctrl？
//不如这样，初始页就定死是登录界面，然后，可视这样之前不是出了问题吗，那之前出的问题是不是能在前端的app里改掉根目录的那个路由就能解决？、
//还是有很多问题啊，这个好了之后一定要先写笔记，查的话，不是在登录那里实现了吗，
//就这样决定了，先解决登录页面，之后再去看看要不要做查的

app.get('/api/books', (req, res ) => {
	console.log('在执行后端app哦')
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

//貌似一直在执行这个,走不下去
app.get('/api/books/:publisher', (req, res, next) => {
	console.log('在走publisher')
	Book.getBookByPb(req.params.publisher, (err, book) => {
		if(err){
			//console.log(err);
			throw err;
		}
		if(book == null) {
			console.log('publisher_book为null');
			next('route');
		}
		else{
			console.log('publisher_book不为null');
			res.json(book);
		} 
			
	});
	
});

app.get('/api/books/:_id', (req, res,next) => {
	console.log('在走id')
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		if(book == null) {
			console.log('id_book为null');
			next('route');
		}
		else{
			console.log('id_book不为null');
			res.json(book);
		} 
	});
});

app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book, next) => {
		if(err){
			throw err;
		}
		if(book == null) {
			console.log(book);
			next('route');
		}
		else res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
