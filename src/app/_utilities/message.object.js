(function(){

  // Message object
  function Message() {

    // constructor
    var Message = function(obj) {

      // handle malformed parameter: obj
      if (typeof obj !== 'object' || obj === null) {
        obj = [];
      }

      // set values to fields
      this.name = obj.name || 'anonymous';
      this.sender = typeof obj.sender === 'boolean' ? obj.sender : true;
      this.emailHash = obj.emailHash || '';
      this.dateTime = obj.dateTime || new Date().getUTCDate();
      this.message = obj.message || '';

    };

    // finalize Message object
    return Message;

  }

  // finalize a list of objects
  angular.module('tbsChatroomApp').factory('Message', Message);

})();
