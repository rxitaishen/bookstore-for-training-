var myApp = angular.module('myApp_2')

//控制user，用于index登录页面时的数据库操作与查询，先去网上查代码，未完成6.5.15.47
myApp.controller('UsersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    $scope.getUsers = function(){
		$http.get('/api/users').success(function(response){
			$scope.users = response;
		});
	}
}])