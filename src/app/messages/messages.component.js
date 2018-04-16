(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function controller(Message) {
    var msg = this;
    msg.feed = [];
    msg.fieldValue = '';
    msg.submitMessage = function() {
      if (msg.fieldValue && msg.fieldValue !== '') {
        // package values as objects
        var message = new Message({
          name: 'james.m.a.adoremos',
          message: msg.fieldValue || ''
        });
        // add to feed
        msg.feed.push(message);
        // empty field for new session
        msg.fieldValue = '';
      }
    };
  }

  /* finalize component setup */
  angular.module('tbsChatroomApp')
    .component('messagesComponent', {
      templateUrl: 'messages.component.html',
      controller: controller,
      controllerAs: 'msg'
    });
})();
