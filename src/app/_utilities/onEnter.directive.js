(function(){

  // msg-enter directive
  var mDependencies = [];
  function onEnter() {

    // defining function to associate to the link property
    function link(scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        var keyCode = event.which || event.keyCode;
        if(keyCode === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.onEnter);
          });
          event.preventDefault();
        }
      });
    }

    // finalize the directive
    return {
      restrict: 'A',
      link: link
    };

  }

  // finalize the list of directives
  mDependencies.push(onEnter);
  angular.module('tbsChatroomApp').directive('onEnter', mDependencies);

})();
