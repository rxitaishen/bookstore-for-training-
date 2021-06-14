var myApp = angular.module('myApp');
var publisherName=""
var wheatherAdmin=""
var titleName=""
var bookS

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('BooksController loaded...');

	$scope.getBooks = function(){
		$http.get('/api/books').success(function(response){
			$scope.books = response;
		});
	}

	$scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('/api/books/'+id).success(function(response){
			$scope.book = response;
			console.log(response)
			console.log(response.author)
		});
	}

	//在搜索框里使用，根据搜索框跳转到具体页面，参考view detail按钮，未完成6.5.15.46
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

	//在搜索框里使用，根据搜索框跳转到具体页面，参考view detail按钮，未完成6.5.15.46
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
				console.log("response")
				console.log(response)
				console.log("author")//这里找不到
				console.log(author)//这里找不到
				console.log("bookT")
				console.log($scope.bookT)
			}
		});
	}

	// $scope.search = function(){
	// 	$scope.titleName1 = "信条"
	// 	titleName1 = $scope.titleName1;//好像angular可以用表单改变值， 菜鸟那里
	// 	console.log("在前端title")
	// 	console.log($scope.titleName1)
	// 	$http.get('/api/books/title/'+titleName1).success(function(response){
	// 		$scope.bookT = response;
	// 		window.location.href='#/booksClienter/details/:title';
	// 	});
	// }

	$scope.getBookByPublisher = function(){
		//var publisher = $routeParams.publisher;
		
		$http.get('/api/books/publisher/'+publisherName).success(function(response){
			$scope.bookP = response;
		});
	}

	$scope.addBook = function(){
		console.log($scope.book);
		$http.post('/api/books/', $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.removeBook = function(id){
		$http.delete('/api/books/'+id).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.searchBook = function(){
		console.log($scope.t);
		$http.post('/api/books/superSearch', $scope.t).success(function(response){
			console.log("在找书")
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
	
	$scope.searchBookResult = function(){
		$scope.bookS=bookS;	
	}

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

	$scope.register = function(){
		$http.post('/api/users/',$scope.user).success(function(response){ //$scope.user是post得到的body
			window.location.href='#/login';
		});
	}

}]);