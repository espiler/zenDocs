angular.module('zenNotez.viewPost', [])

.controller('ViewPostCtrl', ['Shared','$scope', '$location', function(Shared, $scope, $location) {

  var postId = window.location.href.toString().split("#/view/")[1]
  this.currentPost = JSON.parse(localStorage.getItem('posts'))[postId]
  if (!this.currentPost) { $location.path('/index'); }

  var post = [$('.viewTitle'),$('.viewMsg')]
  TweenMax.staggerFrom(post, 0.6, {opacity: 0, y:-10, ease:Sine.easeOut},0.25);

  this.deletePost = function() {
    if (confirm("Release this note to the eternal ether?")) {
      if (this.currentPost) { Shared.deletePost(this.currentPost.id); }
      $scope.$emit('updatePosts');
      $location.path('/index');
    }
  }
  
  window.scrollTo(0,0);

}]);