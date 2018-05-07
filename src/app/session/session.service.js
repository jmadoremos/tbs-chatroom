(function () {

  // start global session
  let socket = io({ autoConnect: false });
  var userDetails = {};

  // Session Service
  function SessionService (UserDetails, Message, $rootScope) {

    let mSessionStarted = false;
    let mTyping = false;
    let mLastTimeTyping = 0;
    const TYPING_TIMER_LENGTH = 400;

    socket.on('new-message', (data) => {
      var messagePackage = new Message(data);
      messagePackage.sender = false;
      $rootScope.$broadcast('new-message', { messagePackage });
    });

    socket.on('start-typing', (data) => {
      var userPackage = new UserDetails(data);
      $rootScope.$broadcast('start-typing', { userPackage });
    });

    socket.on('stop-typing', (data) => {
      var userPackage = new UserDetails(data);
      $rootScope.$broadcast('stop-typing', { userPackage });
    });

    socket.on('add-user', (data) => {
      var userPackage = new UserDetails(data);
      $rootScope.$broadcast('add-user', { userPackage });
    });

    socket.on('remove-user', (data) => {
      var userPackage = new UserDetails(data);
      $rootScope.$broadcast('remove-user', { userPackage });
    });

    function setUserDetails (obj) {
      if (!mSessionStarted) {
        userDetails = new UserDetails(obj);
        socket.open();
        socket.emit('set-user', userDetails);
        mSessionStarted = true;
      }
    }

    function clearUserDetails () {
      if (mSessionStarted) {
        userDetails.empty();
        socket.emit('disconnect');
        mSessionStarted = false;
      }
    }

    function sendMessage (obj) {
      if (mSessionStarted) {
        userDetails.message = obj.message || '';
        if (userDetails.message !== '') {
          socket.emit('send-message', userDetails);
        }
      }
    }

    function updateTyping () {
      if (mSessionStarted) {
        if (!mTyping) {
          mTyping = true;
          socket.emit('start-typing');
        }
        mLastTimeTyping = new Date().getTime();

        setTimeout(() => {
          var typingTimer = (new Date()).getTime();
          var timeDiff = typingTimer - mLastTimeTyping;
          if (timeDiff >= TYPING_TIMER_LENGTH && mTyping) {
            socket.emit('stop-typing', userDetails);
            mTyping = false;
          }
        }, TYPING_TIMER_LENGTH);
      }
    }

    function isLoggedIn () {
      return mSessionStarted;
    }

    function user () {
      return userDetails;
    }

    return {
      clearUserDetails: clearUserDetails,
      isLoggedIn: isLoggedIn,
      sendMessage: sendMessage,
      setUserDetails: setUserDetails,
      updateTyping: updateTyping,
      user: user
    };
  }

  // finalize a list of objects
  angular.module('tbsChatroomApp').service('SessionService', SessionService);

})();
