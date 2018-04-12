(function(){

  // set dependencies
  var mDependencies = ['Message'];

  // define controller
  function Controller(Message) {

    var idx = this;
    idx.feed = [];
    idx.fieldValue = '';

    idx.submitMessage = function() {
      if (idx.fieldValue && idx.fieldValue !== '') {
        // package values as objects
        var message = new Message({
          name: 'james.m.a.adoremos',
          message: idx.fieldValue || ''
        });

        // add to feed
        idx.feed.push(message);

        // empty field for new session
        idx.fieldValue = '';
      }
    };

    // IFFE
    (function(){
      // populate temporary data for feed
      idx.feed.push(
        new Message({
          name: 'james.m.a.adoremos',
          message: 'This is a sample message.'
        }),
        new Message({
          name: 'janette.beltran',
          sender: false,
          message: 'This is a sample message.'
        }),
        new Message({
          name: 'james.m.a.adoremos',
          message: 'This is another sample message to test how the view handles long messages. Though unintended, this will be longer than the rest. We\'ll see what will happen.'
        }),
        new Message({
          name: 'james.m.a.adoremos',
          message: 'This is yet another sample message to test successive messages.'
        })
      );
    })();
  }

  // finalize controller
  mDependencies.push(Controller);
  angular.module('tbsChatroomApp').controller('MessageController', mDependencies);
})();
