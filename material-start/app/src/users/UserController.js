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
    $scope.showName=false;
    $scope.userSettings;
    $scope.userSettings={
            'name':'Manuel',
            'lastName':$scope.lastName,
            'image' : 'coger path'
            }
    self.courseList=[];
    $scope.tempCourses = [];

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
   self.tempCourses = [];

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

   $scope.newObject = {'code' : '','arrowIcon': arrowLeftIcon};

   $scope.saveCourses = function(tempCourses) {

        //console.log(tempCourses);
        //console.log($rootScope.currentCourses);
        console.log(self.tempCourses.length);
        console.log(self.tempCourses[0]);

        while(tempCourses.length > 0)
        {
           //$rootScope.currentCourses.push({'code': tempCourses[1], 'arrowIcon': arrowLeftIcon});
           //self.tempCourses.splice(0,1);
           console.log($rootScope.currentCourses);
        }

     }

   function removeCourse() {
           $rootScope.currentCourses.splice(courseToDelete,1);
           console.log($rootScope.currentCourses);

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
          $scope.saveCourses(self.tempCourses);
          console.log(self.tempCourses);
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

    function selectedItemChange(item) {
      console.log(self.tempCourses);
      console.log(item);
      console.log(item.Code);
      $scope.item = item;
      $rootScope.currentCourses.push({'code': $scope.item.Code, 'arrowIcon': arrowLeftIcon});
      //$scope.tempCourses.push({'code': $scope.item.Code, 'arrowIcon': arrowLeftIcon});
      console.log($scope.tempCourses);
      console.log($scope.currentCourses);
//      $scope.tempCourses.push(item);
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
        console.log(self.tempCourses);
    }

  });

