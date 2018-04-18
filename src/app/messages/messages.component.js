(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function MessageController(Message, SessionService, $scope) {
    var msg = this;

    msg.fieldValue = '';
    msg.feed = [];

    function addMessage(obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      obj.message = obj.message || '';
      if (typeof obj.message === 'string') {
        obj.message.trim();
      }
      if (obj.message !== '') {
        msg.feed.push(obj);
      }
    }

    msg.submitMessage = function() {
      if (SessionService.isLoggedIn()) {
        var userDetails = SessionService.user();
        var message = new Message({ name: userDetails.name, emailHash: userDetails.emailHash, message: msg.fieldValue });
        SessionService.sendMessage(message);
        addMessage(message);
        msg.fieldValue = '';
      }
    };
    msg.isLoggedIn = function() {
      return SessionService.isLoggedIn();
    };

    $scope.$on('disconnect', () => {
      msg.feed = [];
    });

    $scope.$on('new-message', (event, args) => {
      msg.feed.push(args.messagePackage);
    });

  }

  /* finalize component setup */
  angular.module('tbsChatroomApp').component('messagesComponent', {
    templateUrl: 'messages.component.html',
    controller: MessageController,
    controllerAs: 'msg'
  });
})();
