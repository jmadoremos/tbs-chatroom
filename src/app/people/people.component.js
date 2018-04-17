(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function PeopleController(SessionService, md5, $rootScope) {

    var ppl = this;

    // START: user details //
    ppl.userName = '';
    ppl.userEmail = '';
    ppl.userEmailHash = '';
    // END: user details //

    ppl.feed = [];

    ppl.clearUserDetails = function() {
      $rootScope.$broadcast('disconnect');
      SessionService.clearUserDetails();
    };

    ppl.setUserDetails = function() {
      ppl.userEmail = ppl.userEmail.trim().toLocaleLowerCase();
      if (ppl.userEmail !== '') {
        ppl.userEmailHash = md5.createHash(ppl.userEmail);
        SessionService.setUserDetails({ name: ppl.userName, email: ppl.userEmail, emailHash: ppl.userEmailHash });
      }
    };

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
