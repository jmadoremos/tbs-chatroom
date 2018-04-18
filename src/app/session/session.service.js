(function(){

  // start global session
  var socket = io({ autoConnect: false });
  var userDetails = {};

  // Session Service
  function SessionService(UserDetails, Message, $rootScope) {

    var mSessionStarted = false;

    socket.on('new-message', (data) => {
      var messagePackage = new Message(data);
      messagePackage.sender = false;
      $rootScope.$broadcast('new-message', { messagePackage });
    });

    function setUserDetails(obj) {
      if (!mSessionStarted) {
        userDetails = new UserDetails(obj);
        socket.open();
        socket.emit('set-user', userDetails);
        mSessionStarted = true;
      }
    }

    function clearUserDetails() {
      if (mSessionStarted) {
        userDetails.empty();
        socket.emit('disconnect');
        mSessionStarted = false;
      }
    }

    function sendMessage(obj) {
      if (mSessionStarted) {
        userDetails.message = obj.message || '';
        if (userDetails.message !== '') {
          socket.emit('send-message', userDetails);
        }
      }
    }

    function isLoggedIn() {
      return mSessionStarted;
    }

    function user() {
      return userDetails;
    }

    return {
      clearUserDetails: clearUserDetails,
      isLoggedIn: isLoggedIn,
      sendMessage: sendMessage,
      setUserDetails: setUserDetails,
      user: user
    };
  }

  // finalize a list of objects
  angular.module('tbsChatroomApp').service('SessionService', SessionService);

})();
