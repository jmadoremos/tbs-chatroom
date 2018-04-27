(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function PeopleController(SessionService, md5, $rootScope) {

    var ppl = this;

    // START: user details //
    ppl.userName = sessionStorage.getItem('tbs-username') || '';
    ppl.userEmail = sessionStorage.getItem('tbs-email') || '';
    ppl.userEmailHash = sessionStorage.getItem('tbs-emailHash') || '';
    // END: user details //

    ppl.feed = [];

    ppl.clearUserDetails = function() {
      $rootScope.$broadcast('disconnect');
      SessionService.clearUserDetails();
      sessionStorage.clear();
    };

    ppl.setUserDetails = function() {
      ppl.userEmail = ppl.userEmail.trim().toLocaleLowerCase();
      if (ppl.userEmail !== '') {
        ppl.userEmailHash = md5.createHash(ppl.userEmail);
        SessionService.setUserDetails({ name: ppl.userName, email: ppl.userEmail, emailHash: ppl.userEmailHash });

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

  }

  // finalize component setup
  angular.module('tbsChatroomApp').component('peopleComponent', {
    templateUrl: 'people.component.html',
    controller: PeopleController,
    controllerAs: 'ppl'
  });
})();
