angular.module('zenNotez.lastRepeat', [])  
  .directive('onLastRepeat', function() {
    return function(scope) {
      if (scope.$last) setTimeout(function(){
        scope.$emit('onRepeatLast');
      }, 0);
    };
})