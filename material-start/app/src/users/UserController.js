(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log', '$scope','$mdDialog','$location',
          UserController
       ]);
  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope ) {
    var self = this;
    self.loggedIn = false;
    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.makeContact  = makeContact;
    $scope.myDate='';
    $scope.countdown='DB Exam';
    $scope.showCalendar=false;
    $scope.showName=false;
    $scope.userSettings;
    $scope.userSettings={
            'name':'Manuel',
            'lastName':$scope.lastName,
            'image' : 'coger path'
            }
    self.courseList=[];


    $scope.setCalendar = function(){
        $scope.showCalendar = true;
    }

    $scope.saveCountdown = function(){
        $scope.showName = false;
    }

    // Load registered user
    $scope.submitInfo = function(){
        $scope.userSettings={
        'name':$scope.name,
        'lastName':$scope.lastName,
        'image' : 'coger path'
        }
        console.log($scope.courseList);
        self.loggedIn=true;
        $scope.route('/home');
    }

    $scope.setDate = function(date){
        $scope.showCalendar=false;

        $scope.showName = true;
        //Format: Mon Oct 03 2016 00:00:00 GMT-0400 (AST)
        var month = date.getMonth()+1;
        var day = date.getDate();
        var year = date.getFullYear();
        var date = year.toString()+'/'+month.toString()+'/'+day.toString();

        $("#day")
          .countdown(date, function(event) {
            $(this).text(
              event.strftime('%D')
            );
          });

          $("#hour")
          .countdown(date, function(event) {
            $(this).text(
              event.strftime('%H')
            );
          });

          $("#min")
          .countdown(date, function(event) {
            $(this).text(
              event.strftime('%M')
            );
          });

          $("#sec")
          .countdown(date, function(event) {
            $(this).text(
              event.strftime('%S')
            );
          });

    }


    $scope.route = function(path){
        $location.path(path);
    }

    $scope.logIn = function(){
        self.loggedIn=true;
        $scope.route('/home');
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
   self.deleteCourse = deleteCourse;

   $scope.status = '  ';
   $scope.customFullscreen = false;

   self.removeCourse = removeCourse;

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

   $scope.saveCourses = function() {

        console.log($rootScope.courses);
        while($rootScope.courses.length > 0)
        {
           $scope.courseList.push({'code': $rootScope.courses[0], 'arrowIcon': arrowLeftIcon});
           $rootScope.courses.splice(0,1);
        }

     }

   function removeCourse() {
           $scope.courseList.splice(courseToDelete,1);
           console.log($scope.courseList);

      }

    $scope.toggleCourse = function(i){
       if($scope.courseList[i].arrowIcon.search(arrowDownIcon)>-1){
           $scope.courseList[i].arrowIcon = arrowLeftIcon;
       }
       else{
           $scope.courseList[i].arrowIcon = arrowDownIcon;
       }
    }

    function deleteCourse(course){
        var index = $scope.courseList.indexOf(course);
        courseToDelete = index;
        console.log(courseToDelete);
    }


    $scope.showConfirm = function(ev, course) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete this course?')
              .textContent('You can re-add the course later on.')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          $scope.status = 'You decided to get rid of your debt.';
          deleteCourse(course);
          removeCourse();
        }, function() {
          $scope.status = 'You decided to keep your debt.';
        });
      };

    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'addCourses.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
          $scope.saveCourses();
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };




  }

  function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

})();
