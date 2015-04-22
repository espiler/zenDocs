angular.module('zenNotez')
.factory('Shared', ['$http', function($http) {
	var shared = {};
	var currentPost;
	var postList = [];
	var posts;

	shared.setPost = function(post) {
		currentPost = post;
	}

	shared.getPost = function() {
		return currentPost;
	}

	shared.getPostList = function() {
	  posts = JSON.parse(localStorage.getItem('posts'));
	  postList = [];
  	for (var id in posts) {
  		postList.push(posts[id]);
  	};
  	return postList;
	}

	shared.deletePost = function(id) {
		posts = JSON.parse(localStorage.getItem('posts'));
		delete posts[id];
		localStorage.setItem('posts', JSON.stringify(posts));
	}

  return shared;
}]);