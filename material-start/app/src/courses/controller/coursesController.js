var app = angular.module("users")
.controller('coursesController', function($scope, $compile) {

   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";

   $scope.courseList=[
    {'name' : 'ICOM 5016',
     'arrowIcon':arrowDownIcon
    },
    {'name' : 'ICOM 4035',
     'arrowIcon':arrowDownIcon
    },
    {'name' : 'ICOM 4075',
     'arrowIcon':arrowDownIcon
    },
    {'name' : 'ICOM 4009',
     'arrowIcon':arrowDownIcon
     }
   ];

   $scope.toggleCourse = function(i){
    if($scope.courseList[i].arrowIcon.search(arrowDownIcon)>-1){
        $scope.courseList[i].arrowIcon = arrowLeftIcon;
    }
    else{
        $scope.courseList[i].arrowIcon = arrowDownIcon;
    }

   }

});