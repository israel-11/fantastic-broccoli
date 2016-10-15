//(function(){
//
//  angular
//       .module('users')
//       .controller('UserController', [
//          'userService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log', '$scope','$mdDialog','$location',
//          UserController
//       ]);
//  /**
//   * Main Controller for the Angular Material Starter App
//   * @param $scope
//   * @param $mdSidenav
//   * @param avatarsService
//   * @constructor
//   */
//  function UserController( userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope ) {
//    var self = this;
//    $scope.isFire=false;
//    self.selected     = null;
//    self.users        = [ ];
//    self.selectUser   = selectUser;
//    self.toggleList   = toggleUsersList;
//    self.makeContact  = makeContact;
//    $scope.myDate='';
//    $scope.userRole='tutors';
//    $scope.countdown='DB Exam';
//    $scope.userName=''
//    $scope.showCalendar=false;
//    $scope.showName=false;
//    $scope.showMate = false;
//    self.userSettings={
//            'name':'Manuel',
//            'status':'El ser humano es vago por naturaleza',
//            'lastName':$scope.lastName,
//            'image' : 'coger path'
//            }
//    self.courseList=[];
//
//    $scope.setCalendar = function(){
//        $scope.showCalendar = true;
//    }
//
//    $scope.saveCountdown = function(){
//        $scope.showName = false;
//    }
//
//    $scope.isNavBarHide = function(){
//        if($location.path().search('login')>-1){
//            return true;
//        }
//        return false;
//    }
//
//    $scope.selectedItemChange = function(item) {
//        $scope.isFire=true;
//        var object = {
//                    'code' : item.Code,
//                    'arrowIcon' : "fa fa-chevron-left"
//                    }
//        $scope.courseList.push(object);
//        var tempArray = $scope.courseList.slice();
//        $scope.courseList = [];
//        $scope.courseList=tempArray.slice();
//        $timeout(function() {
//            $scope.$apply();
//            $scope.isFire = false;
//        });
//        console.log($scope.courseList);
//
//    }
//
//    $scope.submitSettings = function(){
//        console.log($scope.name);
//        self.userSettings={
//        'name':$scope.name,
//        'status':$scope.status,
//        'lastName':$scope.lastName,
//        'image' : 'coger path'
//        }
//        $scope.userName=$scope.name;
//        console.log($scope.courseList);
//        self.loggedIn=true;
//        if($scope.userRole.search('tutors')>-1){
//            $scope.route('/tutors');
//        }
//        else{
//            $scope.route('/home');
//        }
//
//        $timeout(function() {
//            $scope.$apply();
//        });
//    }
//
////    // Load registered user
//    $scope.submitInfo = function(){
//        $scope.userRole='tutors';
//        console.log($scope.name);
//        self.userSettings={
//        'name':$scope.name,
//        'status':$scope.status,
//        'lastName':$scope.lastName,
//        'image' : 'coger path'
//        }
//        $scope.userName=$scope.name;
//        console.log($scope.courseList);
//        self.loggedIn=true;
//        if($scope.userRole.search('tutors')>-1){
//            $scope.route('/tutors');
//        }
//        else{
//            $scope.route('/home');
//        }
//    }

//    $scope.setDate = function(date){
//        $scope.showCalendar=false;
//
//        $scope.showName = true;
//        //Format: Mon Oct 03 2016 00:00:00 GMT-0400 (AST)
//        var month = date.getMonth()+1;
//        var day = date.getDate();
//        var year = date.getFullYear();
//        var date = year.toString()+'/'+month.toString()+'/'+day.toString();
//
//        $("#day")
//          .countdown(date, function(event) {
//            $(this).text(
//              event.strftime('%D')
//            );
//          });
//
//          $("#hour")
//          .countdown(date, function(event) {
//            $(this).text(
//              event.strftime('%H')
//            );
//          });
//
//          $("#min")
//          .countdown(date, function(event) {
//            $(this).text(
//              event.strftime('%M')
//            );
//          });
//
//          $("#sec")
//          .countdown(date, function(event) {
//            $(this).text(
//              event.strftime('%S')
//            );
//          });
//
//    }
//
//
//    $scope.route = function(path){
//        $location.path(path);
//    }
//
//    $scope.logIn = function(){
//        $scope.userName='Manuel'
//        self.loggedIn=true;
//        $scope.userRole='students';
//        if($scope.userRole.search('tutors')>-1){
//            $scope.route('/tutors');
//        }
//        else{
//            $scope.route('/home');
//        }
//    }
//
//    userService
//          .loadAllUsers()
//          .then( function( users ) {
//            self.users    = [].concat(users);
//            self.selected = users[0];
//          });
//
//    // *********************************
//    // Internal methods
//    // *********************************
//
//    /**
//     * Hide or Show the 'left' sideNav area
//     */
//    function toggleUsersList() {
//      $mdSidenav('left').toggle();
//    }
//
//    /**
//     * Select the current avatars
//     * @param menuId
//     */
//    function selectUser ( user ) {
//      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
//    }
//
//    /**
//     * Show the Contact view in the bottom sheet
//     */
//    function makeContact(selectedUser) {
//
//        $mdBottomSheet.show({
//          controllerAs  : "vm",
//          templateUrl   : './src/users/view/contactSheet.html',
//          controller    : [ '$mdBottomSheet', ContactSheetController],
//          parent        : angular.element(document.getElementById('content'))
//        }).then(function(clickedItem) {
//          $log.debug( clickedItem.name + ' clicked!');
//        });
//
//        /**
//         * User ContactSheet controller
//         */
//        function ContactSheetController( $mdBottomSheet ) {
//          this.user = selectedUser;
//          this.items = [
//            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
//            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
//            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
//            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
//          ];
//          this.contactUser = function(action) {
//            // The actually contact process has not been implemented...
//            // so just hide the bottomSheet
//
//            $mdBottomSheet.hide(action);
//          };
//        }
//    }
//
//
//   /* All of the following pertains to tutors*/
//
//   var arrowDownIcon = "fa fa-chevron-down";
//   var arrowLeftIcon = "fa fa-chevron-left";
//   $scope.availability = "Available";
//
//    $scope.courseList=[
//       {'code' : 'ICOM5016',
//        'arrowIcon':arrowLeftIcon
//       },
//       {'code' : 'ICOM4035',
//        'arrowIcon':arrowLeftIcon
//       },
//       {'code' : 'ICOM4075',
//        'arrowIcon':arrowLeftIcon
//       },
//       {'code' : 'ICOM4009',
//        'arrowIcon':arrowLeftIcon
//       }
//      ];
//
//   $scope.saveCourses = function(tempCourses) {
//
////        console.log(tempCourses);
////        while(tempCourses.length > 0)
////        {
////           $scope.courseList.push({'code': tempCourses[0], 'arrowIcon': arrowLeftIcon});
////           tempCourses.splice(0,1);
////        }
////        var object = {'code' : 'MATE0666',
////                             'arrowIcon':arrowLeftIcon
////                             };
////        $scope.courseList.push(object);
////        $timeout(function() {
////                    $scope.$apply();
////                });
////        console.log($scope.courseList);
//        $scope.showMate = true;
//        console.log($scope.showMate);
//     }
//
//   $scope.removeCourse = function() {
//           $scope.courseList.splice(courseToDelete,1);
//           console.log($scope.courseList);
//
//      }
//
//    $scope.toggleCourse = function(i){
//       if($scope.courseList[i].arrowIcon.search(arrowDownIcon)>-1){
//           $scope.courseList[i].arrowIcon = arrowLeftIcon;
//       }
//       else{
//           $scope.courseList[i].arrowIcon = arrowDownIcon;
//       }
//    }
//
//    $scope.hide = function() {
//      $mdDialog.hide();
//    };
//
//    $scope.cancel = function() {
//      $mdDialog.cancel();
//    };
//
//    $scope.answer = function(answer) {
//      $mdDialog.hide(answer);
//    };
//
//    $scope.deleteCourse =function(course){
//        var index = $scope.courseList.indexOf(course);
//        courseToDelete = index;
//        console.log(courseToDelete);
//    }
//    $scope.showConfirm = function(ev, course) {
//        // Appending dialog to document.body to cover sidenav in docs app
//        var confirm = $mdDialog.confirm()
//              .title('Are you sure you want to delete this course?')
//              .textContent('You can re-add the course later on.')
//              .ariaLabel('Lucky day')
//              .targetEvent(ev)
//              .ok('Yes')
//              .cancel('Cancel');
//
//        $mdDialog.show(confirm).then(function() {
//          $scope.status = 'You decided to get rid of your debt.';
//          $scope.deleteCourse(course);
//          $scope.removeCourse();
//        }, function() {
//          $scope.status = 'You decided to keep your debt.';
//        });
//      };
//
//      $scope.showAdvanced = function(ev, tempCourses) {
//              $mdDialog.show({
//                controller: UserController,
//                templateUrl: 'addCourses.html',
//                parent: angular.element(document.body),
//                targetEvent: ev,
//                clickOutsideToClose:true,
//                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
//              })
//              .then(function(answer) {
//                $scope.status = 'You said the information was "' + answer + '".';
//                $scope.saveCourses(tempCourses);
//              }, function() {
//                $scope.status = 'You cancelled the dialog.';
//              });
//            };
//      function DialogController($scope, $mdDialog) {
//            $scope.hide = function() {
//              $mdDialog.hide();
//            };
//
//            $scope.cancel = function() {
//              $mdDialog.cancel();
//            };
//
//            $scope.answer = function(answer) {
//              $mdDialog.hide(answer);
//            };
//          }
//
//  }
//
//})();
var app = angular.module("users")
    .controller('UserController', function(userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope, $q)
//    .config(['$mdIconProvider', function($mdIconProvider) {
//         $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
//    }])
    {

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */

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
    $scope.userRole='tutors';
    $scope.isFire=false;
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

    $scope.isNavBarHide = function(){
        if($location.path().search('login')>-1){
            return true;
        }
        return false;
    }

    // Load registered user
    $scope.submitSettings = function(){
            console.log($scope.name);
            self.userSettings={
            'name':$scope.name,
            'status':$scope.status,
            'lastName':$scope.lastName,
            'image' : 'coger path'
            }
            $scope.userName=$scope.name;
            console.log($scope.courseList);
            self.loggedIn=true;
            if($scope.userRole.search('tutors')>-1){
                $scope.route('/tutors');
            }
            else{
                $scope.route('/home');
            }

            $timeout(function() {
                $scope.$apply();
            });
        }

    //    // Load registered user
        $scope.submitInfo = function(){
            $scope.userRole='tutors';
            console.log($scope.name);
            self.userSettings={
            'name':$scope.name,
            'status':$scope.status,
            'lastName':$scope.lastName,
            'image' : 'coger path'
            }
            $scope.userName=$scope.name;
            console.log($scope.courseList);
            self.loggedIn=true;
            if($scope.userRole.search('tutors')>-1){
                $scope.route('/tutors');
            }
            else{
                $scope.route('/home');
            }
        }
    $scope.logIn = function(){
            $scope.userName='Manuel'
            self.loggedIn=true;
            $scope.userRole='students';
            if($scope.userRole.search('tutors')>-1){
                $scope.route('/tutors');
            }
            else{
                $scope.route('/home');
            }
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
   self.tempCourses = [];

   $rootScope.tempCourses = [];

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
      ]

   $rootScope.currentCourses = [
        {'code' : 'ICOM5016','arrowIcon': arrowLeftIcon},
        {'code' : 'ICOM4035','arrowIcon': arrowLeftIcon}
   ]

   //$scope.newObject = {'code' : '','arrowIcon': arrowLeftIcon};

   function selectedItemChange(item) {
         //console.log(self.tempCourses);
         //console.log(item);
         //console.log(item.Code);
         $scope.isFire=true;
         $scope.item = item;
         $rootScope.tempCourses.push({'code': $scope.item.Code, 'arrowIcon': arrowLeftIcon});
         //$rootScope.currentCourses.push({'code': $scope.item.Code, 'arrowIcon': arrowLeftIcon});

         console.log($rootScope.tempCourses);

         //console.log($rootScope.currentCourses);
   //      $scope.tempCourses.push(item);
        $timeout(function() {
            $scope.isFire = false;
        });
   }

   function saveCourses() {
        var length = $rootScope.tempCourses.length;
        console.log($rootScope.tempCourses);
        for (var i = 0; i < length; i++) {
            $rootScope.currentCourses.push($rootScope.tempCourses[i]);
            console.log($rootScope.tempCourses[i]);

        }
        console.log($rootScope.currentCourses);

//        console.log(tempCourses);
//        console.log($rootScope.currentCourses);
//        console.log(self.tempCourses.length);
//        console.log(self.tempCourses[0]);
//
//        while(tempCourses.length > 0)
//        {
//           $rootScope.currentCourses.push({'code': tempCourses[1], 'arrowIcon': arrowLeftIcon});
//           self.tempCourses.splice(0,1);
//           console.log($rootScope.currentCourses);
//        }

     }

   function removeCourse() {
           $rootScope.currentCourses.splice(courseToDelete,1);
           //console.log($rootScope.currentCourses);

      }

    $scope.toggleCourse = function(i){
       if($rootScope.currentCourses[i].arrowIcon.search(arrowDownIcon)>-1){
           $rootScope.currentCourses[i].arrowIcon = arrowLeftIcon;
       }
       else{
           $rootScope.currentCourses[i].arrowIcon = arrowDownIcon;
       }
    }

    function deleteCourse(course){
        var index = $rootScope.currentCourses.indexOf(course);
        courseToDelete = index;
        //console.log(courseToDelete);
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
	  if (answer == 'Done') {
            saveCourses();
          }
          $scope.status = 'You said the information was "' + answer + '".';
          //console.log(self.tempCourses);
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };

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


/* searchBarCtrl */

    self.simulateQuery = false;
    self.isDisabled    = false;

    self.repos         = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.removeChip = removeChip;

    //self.tempCourses=[];

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
    }



    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
      var repos = [
        {
          'Code': 'ICOM4035',
          'Title': 'Data Structures'
        },
        {
          'Code': 'ICOM4075',
          'Title': 'Foundations of Computing'
        },
        {
          'Code': 'ICOM4015',
          'Title': 'Advanced Programming'
        },
        {
          'Code': 'ICOM4009',
          'Title': 'Software Engineering'
        },
        {
          'Code': 'MATE666',
          'Title': 'Mate der Diablou'
        }
      ];
      return repos.map( function (repo) {
        repo.value = repo.Code.toLowerCase()+'-'+repo.Title.toLowerCase();
        return repo;
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) != -1);
      };

    }

    //Contact chips implementation
    self.readonly = false;

    // Lists of fruit names and Vegetable objects
    self.roCourseNames = angular.copy(self.repos);
    self.editableCourseNames = angular.copy(self.repos);

    self.tags = [];

    self.newCourse = function(chip) {
      return {
        Code: chip.Code,
        Title: chip.Title
      };
    };



    function removeChip(chip) {
//        var data = JSON.parse($scope.tempCourses);
//        var index = data.map(function(d) { return d['Code']; }).indexOf(chip.Code);
        //console.log(self.tempCourses);
    }

  });
