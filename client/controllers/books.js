var myApp = angular.module('myApp');
var publisherName="" 			//定义全局publisherName，用于从book中获取publisher并传递到搜索端
var wheatherAdmin="" 			//定义全局wheatherAdmin，用于在登录检验时获取是否为管理员身份以判断之后呈现的应该是管理员端还是普通用户端
var titleName="" 				//定义全局titleName，用于从搜索框中获取title并传递到后端进行按名称搜索
var bookS						//用于从返回搜索结果

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	//console.log('BooksController 加载中...');

	//获取所有电影
	$scope.getBooks = function(){
		$http.get('/api/books').success(function(response){
			$scope.books = response;
		});
	}

	//获取指定id的电影
	$scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('/api/books/'+id).success(function(response){
			$scope.book = response;
			console.log(response)
			console.log(response.author)
		});
	}

	//在普通用户端的搜索框里使用，根据搜索框跳转到具体页面
	$scope.getBookByTitle = function(){
		// $scope.titleName = "信条"
		// var titleName = $scope.titleName;//好像angular可以用表单改变值， 菜鸟那里
		// console.log("在前端title")
		// console.log($scope.titleName)
		var titleName = $routeParams.title;
		console.log("在前端title")
		console.log($routeParams.title)
		$http.get('/api/books/title/'+titleName).success(function(response){
			if (response == "未找到相关信息")
				window.location.href='#/booksClienter/searchErr';
			else {
				$scope.bookT = response;
				author = response.author;
				console.log("response")
				console.log(response)
				console.log("author")//这里找不到
				console.log(author)//这里找不到
				console.log("bookT")
				console.log($scope.bookT)
			}
		});
	}

	//在管理员端的搜索框里使用，根据搜索框跳转到具体页面
	$scope.getBookByTitleAdmin = function(){
		// $scope.titleName = "信条"
		// var titleName = $scope.titleName;//好像angular可以用表单改变值， 菜鸟那里
		// console.log("在前端title")
		// console.log($scope.titleName)
		var titleName = $routeParams.title;
		console.log("在前端title")
		console.log($routeParams.title)
		$http.get('/api/books/title/'+titleName).success(function(response){
			if (response == "未找到相关信息")
				window.location.href='#/books/searchErr';
			else {
				$scope.bookT = response;
				author = response.author;
				// console.log("response")
				// console.log(response)
				// console.log("author")//这里找不到
				// console.log(author)//这里找不到
				// console.log("bookT")
				// console.log($scope.bookT)
			}
		});
	}

	//按院线版权方搜索所有隶属于该影院的影片（用于管理员登录时返回该管理员旗下所有的影片）
	$scope.getBookByPublisher = function(){
		//var publisher = $routeParams.publisher;
		$http.get('/api/books/publisher/'+publisherName).success(function(response){
			$scope.bookP = response;
		});
	}

	//管理员权限：添加电影
	$scope.addBook = function(){
		console.log($scope.book);
		$http.post('/api/books/', $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	//管理员权限：更改电影
	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	//管理员权限：删除电影
	$scope.removeBook = function(id){
		$http.delete('/api/books/'+id).success(function(response){
			window.location.href='#/books';
		});
	}

	//按名称搜索电影名
	$scope.searchBook = function(){
		console.log($scope.t);
		$http.post('/api/books/superSearch', $scope.t).success(function(response){
			//console.log("在找书")
			console.log($scope.t)
			if (response == "未找到相关信息")
				window.location.href='#/booksClienter/searchErr';
			else {
				bookS = response; //是个数组 等会新建个页面
				console.log("找到啦")
				console.log(response)
				window.location.href='#/booksClienter/searchResult';
				// author = response.author;
				// console.log("response")
				// console.log(response)
				// console.log("author")//这里找不到
				// console.log(author)//这里找不到
				// console.log("bookT")
				// console.log($scope.bookT)
			}
		});
	}
	
	//返回找到的电影
	$scope.searchBookResult = function(){
		$scope.bookS=bookS;	
	}

	//获取影院信息
	$scope.getCinema = function(){
		var name = $routeParams.name;
		$http.get('/api/genre/name/'+name).success(function(response){
			$scope.cinema = response;
		});
	}

	//登录
	$scope.login = function(){
		$http.post('/api/user/',$scope.user).success(function(response){  //response就是res.send
			publisherName = $scope.user.name;
			// wheatherAdmin = $scope.user.admin; 表单里并没有admin
			console.log(response.admin)
			if(response == '账号或密码错误'){
				window.location.href='#/loginErr';
			}
			else {
				if(response.admin==true)
					window.location.href='#/books';
				else
					window.location.href='#/booksClienter';
			}
		})
	}

	//注册
	$scope.register = function(){
		$http.post('/api/users/',$scope.user).success(function(response){ //$scope.user是post得到的body
			window.location.href='#/login';
		});
	}

}]);