(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log', '$scope','$mdDialog', '$location',
          UserController
       ]);
  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location) {
    var self = this;
    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.makeContact  = makeContact;

    // Load all registered users
    $scope.userSettings= {'name' : 'Manuel'};


    $scope.route = function(path){
        $location.path(path);
    }

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

   /* All of the following pertains to tutors*/

   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";
   $scope.availability = "Available";

   self.removeCourse = removeCourse;

    $scope.tutorCourseList=[
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

   $scope.saveCourses = function(tempCourses) {

   console.log(tempCourses);

          for(i = 0; i < tempCourses; i++)
          {
            console.log(tempCourses);
          }

     }

   function removeCourse(course) {
           var index = $scope.tutorCourseList.indexOf(course);
           console.log(index);
           $scope.tutorCourseList.splice(index,1);

      }

    $scope.toggleCourse = function(i){
       if($scope.tutorCourseList[i].arrowIcon.search(arrowDownIcon)>-1){
           $scope.tutorCourseList[i].arrowIcon = arrowLeftIcon;
       }
       else{
           $scope.tutorCourseList[i].arrowIcon = arrowDownIcon;
       }
    }



 /* All of the following pertains to groups*/

   var arrowDownIcon = "fa fa-chevron-down";
   var arrowLeftIcon = "fa fa-chevron-left";
   $scope.availability = "Available";

   self.removeGroup = removeGroup;

   var members = [{'name' : 'Tahiri Ciquitraque'}, {'name' : 'Nelson Triple A'}, {'name' : 'Israel La Bestia'}]

   $scope.groupList = [
     {'id' : '1', 'name' : 'Project', 'size' : '3', 'limit' : '4', 'arrowIcon' : arrowLeftIcon, 'members' : members},
     {'id' : '2', 'name' : 'Exam 1', 'size' : '3', 'limit' : '3', 'arrowIcon' : arrowLeftIcon, 'members' : members},
     {'id' : '3', 'name' : 'Study Group', 'size' : '3', 'limit' : '8', 'arrowIcon' : arrowLeftIcon, 'members': members},
     {'id' : '4', 'name' : 'Chilea', 'size' : '3', 'limit' : '5', 'arrowIcon' : arrowLeftIcon, 'members': members}
   ]


   $scope.saveGroup = function(tempGroups) {

   console.log(tempGroups);

          for(i = 0; i < tempGroups; i++)
          {
            console.log(tempGroups);
          }

     }

   function removeGroup(group) {
           var index = $scope.groupList.indexOf(group);
           console.log(index);
           $scope.groupList.splice(index,1);

      }

    $scope.toggleGroups = function(i){
       if($scope.groupList[i].arrowIcon.search(arrowDownIcon)>-1){
           $scope.groupList[i].arrowIcon = arrowLeftIcon;
       }
       else{
           $scope.groupList[i].arrowIcon = arrowDownIcon;
       }
    }

  }


})();
