(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function PeopleController($rootScope, $scope, md5, SessionService, UserDetails) {

    var ppl = this;

    // START: user details //
    ppl.userEmail = sessionStorage.getItem('tbs-email') || '';
    ppl.userEmailHash = sessionStorage.getItem('tbs-emailHash') || '';
    // END: user details //

    ppl.userFeed = [];

    function getIndexFromUserFeed(obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      if (obj.email !== undefined) {
        for(var i = 0; i < ppl.userFeed.length; i++) {
          if (ppl.userFeed[i].email === obj.email) {
            return i;
          }
        }
        return -1;
      }
      return -1;
    }

    function addUserToFeed(obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      if (obj.user !== undefined) {
        var index = getIndexFromUserFeed({ email: obj.user.email });
        if (index === -1) {
          ppl.userFeed.push(obj.user);
        }
      }
    }

    function removeUserFromFeed(obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      if (obj.email !== undefined) {
        var index = getIndexFromUserFeed({ email: obj.email });
        ppl.userFeed.splice(index, 1);
      }
    }

    ppl.clearUserDetails = function() {
      $rootScope.$broadcast('disconnect');
      SessionService.clearUserDetails();

      removeUserFromFeed({ email: ppl.userEmail });
      sessionStorage.clear();
    };

    ppl.setUserDetails = function() {
      ppl.userEmail = ppl.userEmail.trim().toLocaleLowerCase();
      if (ppl.userEmail !== '') {
        ppl.userEmailHash = md5.createHash(ppl.userEmail);
        var user = new UserDetails({ email: ppl.userEmail, emailHash: ppl.userEmailHash });
        SessionService.setUserDetails({ user: user });
        addUserToFeed({ user: user });

        sessionStorage.setItem('tbs-email', ppl.userEmail);
        sessionStorage.setItem('tbs-emailHash', ppl.userEmailHash);
      }
    };

    /* Calling immediately this function will allow us to acknowledge user credentials stored
       in sessionStorage. No action will be done if sessionStorage variables are undefined. */
    ppl.setUserDetails();

    ppl.isLoggedIn = function() {
      return SessionService.isLoggedIn();
    };

    $scope.$on('add-user', (event, args) => {
      var user = args.userPackage;
      ppl.userFeed.push(user);
      $scope.$apply();
    });

    $scope.$on('remove-user', (event, args) => {
      var user = args.userPackage;
      removeUserFromFeed({ user: user });
      $scope.$apply();
    });

  }

  // finalize component setup
  angular.module('tbsChatroomApp').component('peopleComponent', {
    templateUrl: 'people.component.html',
    controller: PeopleController,
    controllerAs: 'ppl'
  });
})();
