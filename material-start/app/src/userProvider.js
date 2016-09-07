var app = angular.module("users")
  .config(function ($routeProvider, $locationProvider, $httpProvider) {


    $routeProvider.when('/home',
    {
      templateUrl:    'home.html',
      controller:     'HomeCtrl'
    });
    $routeProvider.when('/courses',
    {
      templateUrl:    'src/courses/courses.html',
      controller:     'CoursesCtrl'
    });
    $routeProvider.when('/groups',
    {
      templateUrl:    'src/groups/groups.html',
      controller:     'GroupsCtrl'
    });
    $routeProvider.otherwise(
    {
      redirectTo:     '/home',
      controller:     'HomeCtrl',
    }
  );
});

app.controller('NavCtrl',
['$scope', '$location', function ($scope, $location) {

  if($location.path().length>3){
    $scope.currentNavItem = $location.path();
  }
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'all';
    return page === currentRoute ? 'active' : '';
  };
}]);

app.controller('CoursesCtrl', function($scope, $compile) {


});

app.controller('GroupsCtrl', function($scope, $compile) {


});


app.controller('HomeCtrl', function($scope, $compile) {

});