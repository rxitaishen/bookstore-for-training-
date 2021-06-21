
//================引入包==================//

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

//引入自定义模块
Genre =require('./models/genre');
Book =require('./models/book');
User =require('./models/user')

//===============链接到mongodb==================//

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

//===============配置后端路由==================//

//访问根目录
app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});

//查询所有影院数据
app.get('/api/genres', (req, res ) => {
	Genre.getCinemas((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

//按影院名称查询影院数据
app.get('/api/genre/name/:name', (req, res ) => {
	Genre.getCinema(req.params.name, (err, cinema) => {
		if(err){
			//console.log(err);
			throw err;
		}
		if(cinema) {
			console.log('cinema不为null');
			res.json(cinema);
		}
		else{
			console.log('cinema为null');
			res.send("名称错误")
		} 
	});
});

//新增影院信息
app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addCinema(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//更改影院信息-----前端未实现
app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateCinema(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//删除影院信息-----前端未实现
app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeCinema(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//关于user的路由
//查询所有user数据
app.get('/api/users', (req, res ) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

//用户注册
app.post('/api/users', (req, res) => {
	var user = req.body;
	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

//检测登录用户
app.post('/api/user', (req, res) => {
	var user = req.body;
	User.findOne({"name":user.name,"password":user.password}, (err, user) => {
		if(err) throw err;
		console.log(user)
        if(user){
			//console.log(user)
			//res.send('登录成功');  json跟send只能有一个哦 不然就终止请求了
			res.json(user)
            
        }else {
			//throw new Error("账号或密码错误");
            res.send('账号或密码错误')
        }
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

//获取所有电影的信息-----原本是想做书店的，但另一个大作业需要就改了数据。
app.get('/api/books', (req, res ) => {
	//console.log('正在执行后端代码')
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

//按电影版权所有者查询电影
//貌似一直在执行这个,走不下去----只要改一下路由不要跟下面的按id查询的路由重起来就好
app.get('/api/books/publisher/:publisher', (req, res, next) => {
	console.log('在走publisher')
	Book.getBookByPb(req.params.publisher, (err, bookP) => {
		if(err){
			//console.log(err);
			throw err;
		}
		if(bookP) {
			console.log('publisher_book不为null');
			res.json(bookP);
		}
		else{
			console.log('publisher_book为null');
			res.send("管理员登录错误，虽然我不可能出现")
		} 
			
	});
	
});

//按电影名查询电影
app.get('/api/books/title/:title', (req, res, next) => {
	console.log('在走title')
	Book.getBookByTitle(req.params.title, (err, bookT) => {
		console.log(bookT)
		if(err){
			//console.log(err);
			throw err;
		}
		if(bookT) { //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
			console.log('title_book不为null');
			res.json(bookT);
		}
		else{
			console.log('title_book为null');
			res.send("未找到相关信息")
		} 
			
	});
	
});

//按id名查询电影
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

//添加电影
app.post('/api/books', (req, res) => {
	var book = req.body;
	//console.log(book.img_url)
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

//高级搜索
app.post('/api/books/superSearch', (req, res) => {
	var t = req.body;
	console.log("在后端高级搜索")
	// console.log(typeof t.genre);
	// console.log(typeof t.genre);
	// console.log(typeof t.duibi);
	// console.log(typeof t.pages);
	genre=t.genre;
	author=t.author;
	duibi=t.duibi;
	pages=t.pages;
	var gjss = {}
	if(typeof(genre) != "undefined"){
		g = {"genre":genre}
		Object.assign(gjss,g);
	}
	if(typeof(author) != "undefined"){
		a = {"author":author}
		Object.assign(gjss,a);
	}
	if(typeof(pages) != "undefined"){
		if(duibi == "more")
			p = {"pages":{$gt:pages}}
		else if (duibi == "less")
			p = {"pages":{$lt:pages}}
		else if (duibi == "equal")
			p = {"pages":pages}
		Object.assign(gjss,p);
	}
	console.log("高级搜索");
	console.log(gjss);
	if(gjss.length!=0){
		Book.find(gjss,(err,bookS) => {
			if(err){
				throw err;
			}
			if(bookS.length!=0) { //findone 和find 返回值有区别，当找不到时 find返回空数组,是个数组，findone返回null
				console.log('search_book不为null');
				console.log(bookS)
				res.json(bookS);
			}
			else{
				console.log('search_book为null');
				res.send("未找到相关信息")
			} 
		})
	}
	else {
		Book.find((err,bookS) => {
			if(err){
				throw err;
			}
			if(bookS) { //findone 和find 返回值有区别，当找不到时 find返回空数组,是个数组，findone返回null
				console.log('search_book不为null');
				console.log(bookS)
				res.json(bookS);
			}
			else{
				console.log('search_book为null');
				res.send("未找到相关信息")
			} 
		})
	}
});

//更新电影信息
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

//删除电影
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
