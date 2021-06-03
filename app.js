const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre =require('./models/genre');
Book =require('./models/book');

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

app.get('/api/books', (req, res ) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

//貌似一直在执行这个,走不下去
app.get('/api/books/:title', (req, res, next) => {
	console.log('在走title')
	Book.getBookByTitle(req.params.title, (err, book) => {
		if(err){
			//console.log(err);
			throw err;
		}
		if(book == null) {
			console.log('title_book为null');
			next('route');
		}
		else{
			console.log('title_book不为null');
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
