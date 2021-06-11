var myApp = angular.module('myApp');
var publisherName=""
var wheatherAdmin=""

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
		});
	}

	//在搜索框里使用，根据搜索框跳转到具体页面，参考view detail按钮，未完成6.5.15.46
	$scope.getBookByTitle = function(){
		var title = $routeParams.title;
		$http.get('/api/books/'+title).success(function(response){
			$scope.bookT = response;
		});
	}

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

	$scope.login = function(){
		$http.post('/api/user/',$scope.user).success(function(response){  //response就是res.send
			publisherName = $scope.user.name;
			wheatherAdmin = $scope.user.admin;
			console.log(wheatherAdmin)
			console.log(response)
			if(response == '账号或密码错误'){
				window.location.href='#/loginErr';
			}
			else {
				window.location.href='#/books';
			}
		})
	}

	$scope.register = function(){
		$http.post('/api/users/',$scope.user).success(function(response){ //$scope.user是post得到的body
			window.location.href='#/login';
		});
	}

}]);