var app = angular.module("users")
.controller('groupController', function($scope, $compile, $location) {

    var arrowDownIcon = "fa fa-chevron-down"
    var arrowLeftIcon = "fa fa-chevron-left"
    var members = [{'name' : 'Tahiri Ciquitraque'}, {'name' : 'Nelson Triple A'}, {'name' : 'Israel La Bestia'}]

    $scope.tempItem;
    $scope.selectedItems = [];
    $scope.items = [];
    var list = [];

    $scope.groupList = [
    {'id' : '1', 'name' : 'Project', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '2', 'name' : 'Exam 1', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members},
    {'id' : '3', 'name' : 'Chilea', 'size' : '3', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '4', 'name' : 'Study Group', 'size' : '3', 'limit' : '8', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '5', 'name' : 'Final Project', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '1', 'name' : 'Final Exam', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members': members},
    {'id' : '3', 'name' : 'Exam 3', 'size' : '3', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members}
    ]

    $scope.groupsList = [
        {'id' : '1', 'name' : 'Project', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members' : members},
        {'id' : '2', 'name' : 'Exam 1', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members}
        ]

    $scope.courseList = [
    {'id' : '1', 'code' : 'ICOM4035', 'title' : 'Data Structures'},
    {'id' : '2', 'code' : 'ICOM4075', 'title' : 'Foundations of Computing'},
    {'id' : '3', 'code' : 'ICOM4015', 'title' : 'Advanced Programming'},
    {'id' : '4', 'code' : 'ICOM4009', 'title' : 'Software Engineering'},
    {'id' : '5', 'code' : 'MATE0666', 'title' : 'Mate der Diablou'}
    ]

    $scope.toggleGroups = function(i){
        if ($scope.groupsList[i].arrowIcon.search(arrowDownIcon)>-1){
            $scope.groupsList[i].arrowIcon = arrowLeftIcon;
        }
        else
            $scope.groupsList[i].arrowIcon = arrowDownIcon;
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

    $scope.toggle = function (item, list) {
      var idx = $scope.groupsList.indexOf(item);
      if (idx > -1) {
        $scope.groupsList.splice(idx, 1);
        console.log($scope.groupsList);
      }
      else {
        //list.push(item);
        $scope.groupsList.push(item);
        console.log($scope.groupsList);
      }
      var tempArray = $scope.groupsList.slice();
      $scope.groupsList = [];
      $scope.groupsList = tempArray.slice();
    }

    $scope.exists = function (item, list) {
      return $scope.selectedItems.indexOf(item) > -1;
    }

    $scope.submitGroup = function(){
        for (var i = 0; i < $scope.selectedItems.length; i++){
            $scope.groupsList.push($scope.selectedItems[i]);
        }
        //$location.path('#/groups');
    }

    $scope.joinGroup = function(){
        console.log('Joining '+$scope.selectedItems[0]);
        $scope.groupsList.push($scope.selectedItems[0]);
        console.log($scope.groupsList);
        for(var i = 0; i < $scope.selectedItems.length; i++){
            $scope.groupsList.push($scope.selectedItems[i]);
        }
        var tempArray = $scope.groupsList.slice();
        $scope.groupsList = [];
        $scope.groupsList = tempArray.slice();

    }

    $scope.saveGroup = function(tempGroups) {
        for(i = 0; i < tempGroups; i++){
        }
    }

    $scope.removeGroup = function(group) {
        var index = $scope.groupsList.indexOf(group);
        $scope.groupsList.splice(index,1);
    }

    self.removeGroup = $scope.removeGroup;
    self.submitGroup = $scope.submitGroup;
});

