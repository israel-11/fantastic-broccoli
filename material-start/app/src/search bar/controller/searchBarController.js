(function () {
  'use strict';
  angular
      .module('users')
      .controller('searchBarCtrl', DemoCtrl);

//  function DemoCtrl ($q, $timeout, $scope) {
//    var self = this;
//    var pendingSearch, cancelSearch = angular.noop;
//    var cachedQuery, lastSearch;
//    $scope.message = "What courses are you taking this semester?";
//    $scope.tempCourses = [];
//
//    self.allContacts = loadContacts();
//    self.contacts = [self.allContacts[0]];
//    $scope.asyncContacts = [];
//    self.filterSelected = true;
//
//    self.querySearch = querySearch;
//    self.delayedQuerySearch = delayedQuerySearch;
//
//    /**
//     * Search for contacts; use a random delay to simulate a remote call
//     */
//    function querySearch (criteria) {
//      cachedQuery = cachedQuery || criteria;
//      return cachedQuery ? self.allContacts.filter(createFilterFor(cachedQuery)) : [];
//    }
//
//    /**
//     * Async search for contacts
//     * Also debounce the queries; since the md-contact-chips does not support this
//     */
//    function delayedQuerySearch(criteria) {
//      cachedQuery = criteria;
//      if ( !pendingSearch || !debounceSearch() )  {
//        cancelSearch();
//
//        return pendingSearch = $q(function(resolve, reject) {
//          // Simulate async search... (after debouncing)
//          cancelSearch = reject;
//          $timeout(function() {
//
//            resolve( self.querySearch() );
//
//            refreshDebounce();
//          }, Math.random() * 500, true)
//        });
//      }
//
//      return pendingSearch;
//    }
//
//    function refreshDebounce() {
//      lastSearch = 0;
//      pendingSearch = null;
//      cancelSearch = angular.noop;
//    }
//
//    /**
//     * Debounce if querying faster than 300ms
//     */
//    function debounceSearch() {
//      var now = new Date().getMilliseconds();
//      lastSearch = lastSearch || now;
//
//      return ((now - lastSearch) < 300);
//    }
//
//    /**
//     * Create filter function for a query string
//     */
//    function createFilterFor(query) {
//      var lowercaseQuery = angular.lowercase(query);
//
//      return function filterFn(contact) {
//        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
//      };
//
//    }
//
//    function loadContacts() {
//      var contacts = [
//        'ICOM5016 - Databases',
//        'MATE666 - Mate der diablou',
//        'ICOM4035 - Data Structures',
//        'ICOM4015 - Advanced Programming',
//        'INEL4207 - Electronica Digital',
//        'ICOM4075 - Foundations of Computing'
//
//      ];
//
//      return contacts.map(function (c, index) {
//        var cParts = c.split('-');
//        var contact = {
//          title: c,
//          email: cParts[0].toLowerCase() + ' - ' + cParts[1].toLowerCase(),
//        };
//        contact._lowername = contact.title.toLowerCase();
//        return contact;
//      });
//    }
//
//    $scope.test = function(){
//        $scope.message = "Hi"
//    }
//
//    $scope.saveCourses = function(){
//        console.log($scope.asyncContacts);
//    }
//
//    $scope.tempChip = function(newCourses){
//        $scope.tempCourses.push({'name': newCourses})
//    }
//
//
//
//  }

function DemoCtrl ($timeout, $q, $log, $scope) {
var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    self.repos         = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

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
      console.log('Dimelo nelson, miralo aqui: '+ item.name)
    }

    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
      var repos = [
        {
          'Code': 'ICOM4035',
          'Dash': '-',
          'Title': 'Data Structures'
        },
        {
          'Code': 'ICOM4075',
          'Dash': '-',
          'Title': 'Foundations of Computing'
        },
        {
          'Code': 'ICOM4015',
          'Dash': '-',
          'Title': 'Advanced Programming'
        },
        {
          'Code': 'ICOM4009',
          'Dash': '-',
          'Title': 'Software Engineering'
        },
        {
          'Code': 'MATE666',
          'Dash': '-',
          'Title': 'Mate der Diablou'
        }
      ];
      return repos.map( function (repo) {
        repo.value = repo.Code.toLowerCase()+repo.Dash+repo.Title.toLowerCase();
        return repo;
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };

    }
    $scope.saveCourses = function(){
            console.log($scope.curso);
        }
  }




})();


/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/