var myApp = angular.module('myApp',['ngRoute']);

//AngularJS 模块的 config 函数用于配置路由规则。通过使用 configAPI，我们请求把$routeProvider注入到我们的配置函数并且使用$routeProvider.whenAPI来定义我们的路由规则。

//$routeProvider 为我们提供了 when(path,object) & otherwise(object) 函数按顺序定义所有路由，函数包含两个参数:

//第一个参数是 URL 或者 URL 正则规则。
//第二个参数是路由配置对象。

myApp.config(function($routeProvider){
	console.log('在执行前端app哦')
	$routeProvider.when('/', {        //这边是创建路由,homepage,因为一开始就是/作为根目录了
		controller:'BooksController', //controller:function、string或数组类型，在当前模板上执行的controller函数，生成新的scope。
		templateUrl: 'views/root.html'
	})
	.when('/books', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books/details/:id',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html'
	})
	.when('/books/details/:title',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html'
	})
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html'
	})
	.when('/books/edit/:id',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html'
	})
	.when('/login',{
		controller:'BooksController',
		templateUrl: 'views/root.html'
	})
	.when('/register',{
		controller:'BooksController',
		templateUrl: 'views/register.html'
	})
	.when('/loginErr',{
		controller:'BooksController',
		templateUrl: 'views/err.html'
	})
	.otherwise({
		redirectTo: '/' //redirectTo:重定向的地址。
	});
});