(function () {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function MessageController (Message, SessionService, $scope) {
    var msg = this;

    msg.fieldValue = '';
    msg.feed = [];
    msg.typingMessage = '';
    msg.typingUsers = 0;

    /* thoroughly checking the integrity of the message will allow
       us to properly parse its value and add it to our feed without
      additional bytes */
    function addMessage (obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      obj.message = obj.message || '';
      if (typeof obj.message === 'string') {
        obj.message.trim();
      }
      if (typeof obj ==='object' && obj.message !== '') {
        msg.feed.push(obj);
      }
    }

    /* checking first that the user is logged in ensures that all our
       necessary data for the message transmission is complete and
       packaged */
    msg.submitMessage = function () {
      if (SessionService.isLoggedIn()) {
        var userDetails = SessionService.user();
        var message = new Message({ name: userDetails.name, emailHash: userDetails.emailHash, message: msg.fieldValue });
        msg.fieldValue = '';
        SessionService.sendMessage(message);
        addMessage(message);
      }
    };

    /* calling the updateTyping function allows for a centralized way of maintaining the current
       session and state inside the SessionService */
    msg.typing = function () {
      SessionService.updateTyping();
    };

    /* creating an extension function for the SessionService will
       allow this controller to call the said function in the view */
    msg.isLoggedIn = function () {
      return SessionService.isLoggedIn();
    };

    /* listening to the "disconnect" broadcast will allow us to
       update the feed view accordingly */
    $scope.$on('disconnect', () => {
      msg.feed = [];
    });

    /* listening to the "new-message" broadcast will allow us to
       upduate our view when other users sends a message */
    $scope.$on('new-message', (event, args) => {
      addMessage(args.messagePackage);
      $scope.$apply();
    });

    $scope.$on('start-typing', (event, args) => {
      var user = args.userPackage;
      msg.typingUsers += 1;
      if (msg.typingUsers === 1) {
        msg.typingMessage = `${user.name} is typing...`;
      } else {
        msg.typingMessage = `${msg.typingUsers} users are typing...`;
      }
      $scope.$apply();
    });

    $scope.$on('stop-typing', () => {
      msg.typingUsers = msg.typingUsers > 0 ? msg.typingUsers - 1 : 0;
      msg.typingMessage = '';
      $scope.$apply();
    });

  }

  /* finalize component setup */
  angular.module('tbsChatroomApp').component('messagesComponent', {
    templateUrl: 'messages.component.html',
    controller: MessageController,
    controllerAs: 'msg'
  });
})();
