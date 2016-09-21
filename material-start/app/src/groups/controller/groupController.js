var app = angular.module("users")
.controller('groupController', function($scope, $compile) {

    var arrowDownIcon = "fa fa-chevron-down"
    var arrowLeftIcon = "fa fa-chevron-left"


    var members = [{'name' : 'Tahiri'}, {'name' : 'Nelson Triple A'}]

    $scope.groupList = [
    {'id' : '1', 'name' : 'Project', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '2', 'name' : 'Exam 1', 'size' : '2', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '3', 'name' : 'Study Group', 'size' : '1', 'limit' : '8', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '4', 'name' : 'Chilea', 'size' : '4', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members}
    ]


    $scope.toggleGroups = function(i){

        if ($scope.groupList[i].arrowIcon.search(arrowDownIcon)>-1){
            $scope.groupList[i].arrowIcon = arrowLeftIcon;
        }
        else
            $scope.groupList[i].arrowIcon = arrowDownIcon;
    }


});