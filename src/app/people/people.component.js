(function() {

  /* defining the controller beforehand ensures that the function
     is callable anywhere in this IFFE scope */
  function controller() {
    var ppl = this;
    ppl.feed = [];
  }

  // finalize component setup
  angular.module('tbsChatroomApp')
    .component('peopleComponent', {
      templateUrl: 'people.component.html',
      controller: controller,
      controllerAs: 'ppl'
    });
})();
