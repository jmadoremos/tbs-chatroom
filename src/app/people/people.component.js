(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function PeopleController($rootScope, $scope, md5, SessionService, UserDetails) {

    var ppl = this;

    // START: user details //
    ppl.userName = sessionStorage.getItem('tbs-username') || '';
    ppl.userEmail = sessionStorage.getItem('tbs-email') || '';
    ppl.userEmailHash = sessionStorage.getItem('tbs-emailHash') || '';
    // END: user details //

    ppl.feed = [];

    function removeUserFromFeed(obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      if (obj.user !== undefined) {
        for(var i = 0; i < ppl.feed.length; i++) {
          if (ppl.feed[i].name === obj.user.name) {
            ppl.feed.splice(i, 1);
          }
        }
      }
    }

    ppl.clearUserDetails = function() {
      $rootScope.$broadcast('disconnect');
      SessionService.clearUserDetails();

      removeUserFromFeed({ user: { name: ppl.userName }});
      sessionStorage.clear();
    };

    ppl.setUserDetails = function() {
      ppl.userEmail = ppl.userEmail.trim().toLocaleLowerCase();
      if (ppl.userEmail !== '') {
        ppl.userEmailHash = md5.createHash(ppl.userEmail);
        var user = new UserDetails({ name: ppl.userName, email: ppl.userEmail, emailHash: ppl.userEmailHash });
        SessionService.setUserDetails(user);
        ppl.feed.push(user);

        sessionStorage.setItem('tbs-username', ppl.userName);
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
      ppl.feed.push(user);
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
