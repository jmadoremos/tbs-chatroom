(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function MessageController(Message, SessionService, $scope) {
    var msg = this;
    msg.fieldValue = '';
    msg.feed = [];
    msg.submitMessage = function() {
      if (SessionService.isLoggedIn()) {
        var message = new Message({ name: SessionService.user().name, message: msg.fieldValue });
        SessionService.sendMessage(message);
        addMessage(message);
        msg.fieldValue = '';
      }
    };
    msg.isLoggedIn = function() {
      return SessionService.isLoggedIn();
    };

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

    $scope.$on('disconnect', () => {
      msg.feed = [];
    });

    $scope.$on('new-message', (event, args) => {
      var message = args.message;
      msg.feed.push(message);
    });

  }

  /* finalize component setup */
  angular.module('tbsChatroomApp').component('messagesComponent', {
    templateUrl: 'messages.component.html',
    controller: MessageController,
    controllerAs: 'msg'
  });
})();
