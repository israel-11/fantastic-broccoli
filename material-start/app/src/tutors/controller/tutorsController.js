var app = angular.module("users")
.controller('tutorsController', function($scope, $compile) {

   $scope.availability = "Available";
   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";

   $scope.courseList=[
    {'code' : 'ICOM5016',
     'arrowIcon':arrowLeftIcon
    },
    {'code' : 'ICOM4035',
     'arrowIcon':arrowLeftIcon
    },
    {'code' : 'ICOM4075',
     'arrowIcon':arrowLeftIcon
    },
    {'code' : 'ICOM4009',
     'arrowIcon':arrowLeftIcon
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