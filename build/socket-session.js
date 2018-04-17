function SocketSession() {
  var mUserDetails = {
    id: '',
    name: '',
    email: ''
  };

  function close() {
    mUserDetails = {
      id: '',
      name: '',
      email: ''
    };
    return mUserDetails;
  }

  function setUserDetails(obj) {
    if (typeof obj !== 'object' || obj === null) {
      obj = [];
    }
    mUserDetails.id = obj.id || '';
    mUserDetails.name = obj.name || 'anonymous';
    mUserDetails.email = obj.email || '';
  }

  return {
    close: close,
    setUserDetails: setUserDetails,
    user: mUserDetails
  };
}

module.exports = new SocketSession();
