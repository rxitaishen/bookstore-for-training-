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
	Genre.getCinemas((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

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
			res.send("影院名称错误")
		} 
			
		
	});
});


app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addCinema(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

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

app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeCinema(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//这里开始写user的路由
//获取user列表
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
	
	// Book.find(t, (err, book) => {
	// 	if(err){
	// 		throw err;
	// 	}
	// 	res.json(book);
	// });
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
