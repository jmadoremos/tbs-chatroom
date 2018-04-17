function SocketSession() {

  var mUserDetails = {
    id: '',
    name: '',
    email: '',
    emailHash: ''
  };

  function close() {
    mUserDetails = {
      id: '',
      name: '',
      email: '',
      emailHash: ''
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
    mUserDetails.emailHash = obj.emailHash || '';
  }

  return {
    close: close,
    setUserDetails: setUserDetails,
    user: mUserDetails
  };

}

module.exports = new SocketSession();
