(function(){

  // Message object
  function UserDetails() {

    this.mLastMessage = '';

    function mValidateParam(obj) {
      if (typeof obj !== 'object' || obj === null) {
        obj = {};
      }
      return obj;
    }

    function mValidateArg(arg, def) {
      arg = arg || '';
      arg.trim();
      if (typeof arg === 'boolean') {
        arg = def;
      }
      return arg;
    }

    // "new UserDetails()" constructor
    var UserDetails = function(obj) {
      obj = mValidateParam(obj);
      this.name = mValidateArg(obj.name, 'anonymous');
      this.email = mValidateArg(obj.email, '');
      this.emailHash = mValidateArg(obj.emailHash, '');
      this.message = '';
      this.messages = [];
    };

    // "UserDetails.empty()" function
    UserDetails.prototype.empty = function () {
      this.name = '';
      this.email = '';
      this.emailHash = '';
      this.message = '';
      this.messages = [];
    };

    // "UserDetails.message" property
    Object.defineProperty(this, 'message', {
      get: function() {
        return this.mLastMessage;
      },
      set: function(val) {
        val = val || '';
        if (typeof val === 'string') {
          val = val.trim();
        }
        this.mLastMessage = val;
      }
    });

    // finalize Message object
    return UserDetails;

  }

  // finalize a list of objects
  angular.module('tbsChatroomApp').factory('UserDetails', UserDetails);

})();
