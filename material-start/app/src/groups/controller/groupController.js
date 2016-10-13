var app = angular.module("users")
.controller('groupController', function($scope, $compile, $location) {

    var arrowDownIcon = "fa fa-chevron-down"
    var arrowLeftIcon = "fa fa-chevron-left"


    var members = [{'name' : 'Tahiri Ciquitraque'}, {'name' : 'Nelson Triple A'}, {'name' : 'Israel La Bestia'}]

    $scope.groupList = [
    {'id' : '1', 'name' : 'Project', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '2', 'name' : 'Exam 1', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '3', 'name' : 'Study Group', 'size' : '3', 'limit' : '8', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '3', 'name' : 'Chilea', 'size' : '3', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '4', 'name' : 'Study Group', 'size' : '3', 'limit' : '8', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '5', 'name' : 'Study Group', 'size' : '3', 'limit' : '8', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '5', 'name' : 'Final Project', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '1', 'name' : 'Final Exam', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '3', 'name' : 'Exam 3', 'size' : '3', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members}
    ]

    $scope.courseList = [
    {'id' : '1', 'code' : 'ICOM4035', 'title' : 'Data Structures'},
    {'id' : '2', 'code' : 'ICOM4075', 'title' : 'Foundations of Computing'},
    {'id' : '3', 'code' : 'ICOM4015', 'title' : 'Advanced Programming'},
    {'id' : '4', 'code' : 'ICOM4009', 'title' : 'Software Engineering'},
    {'id' : '5', 'code' : 'MATE0666', 'title' : 'Mate der Diablou'}
    ]

    $scope.toggleGroups = function(i){

        if ($scope.groupList[i].arrowIcon.search(arrowDownIcon)>-1){
            $scope.groupList[i].arrowIcon = arrowLeftIcon;
        }
        else
            $scope.groupList[i].arrowIcon = arrowDownIcon;
    }

    $scope.courseGroups = function (selectedCourse){
        var selected = 0;
        var length = $scope.courseList.length;
        var items = [];
        var length2 = $scope.groupList.length;

        for (var i = 0; i < length; i++) {
            var selection = selectedCourse.split("-");
            var temp = selection[0].split(" ");
            var string = temp[1];
            if($scope.courseList[i].code == string) {
                selected = $scope.courseList[i].id;
                break;

            }
        }

        for (var j = 0; j < length2; j++) {
            if ($scope.groupList[j].id == selected) {
                items.push($scope.groupList[j]);
            }
        }

        $scope.items = items;
    }

    $scope.selected = [];

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    }

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    }

    $scope.submitGroup = function(){
        $location.path('#/groups');
    }

});

