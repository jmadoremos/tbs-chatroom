(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function MessageController(Message, SessionService, $scope) {
    var msg = this;

    msg.fieldValue = '';
    msg.feed = [];

    /* thoroughly checking the integrity of the message will allow
       us to properly parse its value and add it to our feed without
      additional bytes */
    function addMessage(obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      obj.message = obj.message || '';
      if (typeof obj.message === 'string') {
        obj.message.trim();
      }
      if (typeof obj ==='object' && obj.message !== '') {
        msg.feed.push(obj);
        $scope.$apply();
      }
    }

    /* checking first that the user is logged in ensures that all our
       necessary data for the message transmission is complete and
       packaged */
    msg.submitMessage = function() {
      if (SessionService.isLoggedIn()) {
        var userDetails = SessionService.user();
        var message = new Message({ name: userDetails.name, emailHash: userDetails.emailHash, message: msg.fieldValue });
        msg.fieldValue = '';
        SessionService.sendMessage(message);
        addMessage(message);
      }
    };

    /* creating an extension function for the SessionService will
       allow this controller to call the said function in the view */
    msg.isLoggedIn = function() {
      return SessionService.isLoggedIn();
    };

    /* listening to the "disconnect" broadcast will allow us to
       update the feed view accordingly */
    $scope.$on('disconnect', () => {
      msg.feed = [];
      $scope.$apply();
    });

    /* listening to the "new-message" broadcast will allow us to
       upduate our view when other users sends a message */
    $scope.$on('new-message', (event, args) => {
      addMessage(args.messagePackage);
    });

  }

  /* finalize component setup */
  angular.module('tbsChatroomApp').component('messagesComponent', {
    templateUrl: 'messages.component.html',
    controller: MessageController,
    controllerAs: 'msg'
  });
})();
