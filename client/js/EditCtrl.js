angular.module('zenNotez.edit', [])

.controller('EditCtrl', ['Shared','$scope', '$location', function(Shared, $scope, $location) {
  _this = this;

  //autosave post if user navigates away
  $scope.$on('savePost', function(event, bool) {
    _this.savePost();
    if (bool) { $location.path('/index') }
  });

  this.posts = JSON.parse(localStorage.getItem('posts')) || {};

  this.currentPost = Shared.getPost();
  
  if (this.currentPost) {
    this.title = this.currentPost.title;
    this.msg = this.currentPost.msg;
    this.postId = this.currentPost.id;
  }

  this.postChanged = function() {
    this.postSaved = false;
    this.isEmpty = false;
  }
  
  this.savePost = function() {
    if (!this.msg && !this.title) {
      return this.isEmpty = true;
    }
    if (!(this.postId > -1)) { 
      this.postId = localStorage.getItem('nextId') || 1;
      localStorage.setItem('nextId', (parseInt(this.postId)+1));
      this.posts[this.postId] = {created: Date.now()}
    }
    this.posts[this.postId].title = this.title || 'untitled'
    this.posts[this.postId].msg = this.msg;
    this.posts[this.postId].id = this.postId;
    this.posts[this.postId].modified = Date.now();
    localStorage.setItem('posts', JSON.stringify(this.posts));
    this.postSaved = true;
    $scope.$emit('updatePosts');
  }

  this.deletePost = function() {
    if (confirm("Release this note to the eternal ether?")) {
      if (this.currentPost) { Shared.deletePost(this.postId); }
      $scope.$emit('updatePosts');
      $location.path('/index');
    }
  }

  this.postChanged();

}]);