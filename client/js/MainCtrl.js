angular.module('zenNotez.main', [])
.controller('MainCtrl', ['Shared','$scope', '$location', function(Shared, $scope, $location) {
	var _this = this;
	var overlapThreshold = 34;
	this.page = "index";

	this.animate = function(time){
		var titles = $('.postTitle');
		var icons = $('.noteIcon');
		makeDraggable();
		TweenMax.staggerFrom(titles, 2, {opacity:'0', ease:Sine.easeIn}, 0.09);
		TweenMax.staggerFrom(titles, 1, {y:'-25', ease:Sine.easeIn}, 0.09);
		TweenMax.staggerFrom(icons, 2, {opacity:'0', ease:Sine.easeIn}, 0.09);
		TweenMax.staggerFrom(icons, 1.5, {rotation:180, ease:Sine.easeOut}, 0.09);
	}

	function makeDraggable() {
		var dragPosts = $('.post');
		var hits = $('.dropicon');
		var dragOptions = $('.dragOptions');
		var fade = $('.fade');

		Draggable.create(dragPosts, {
			onDragStart: function(e) {
				TweenMax.to(dragOptions, 0.5, {y:-80, opacity: 1, ease: Sine.easeOut});
				TweenMax.to(fade, 0.3, {opacity:0.7, ease: Sine.easeOut});
			},
		  onDrag: function(e) {
		    var i = hits.length;
			 	while (--i > -1) {
	       	if (this.hitTest(hits[i], overlapThreshold)) {
	         	hits[i].id === 'delete' ?
	         		$(hits[i]).addClass("highlightRed"):
		         	$(hits[i]).addClass("highlight");
	       	} else {
	         	hits[i].id === 'delete' ?
         			$(hits[i]).removeClass("highlightRed"):
	         		$(hits[i]).removeClass("highlight");
	       	}
	    	}
		  },
		  onDragEnd:function(e) {
				var i = hits.length;
				while (--i > -1) {
					if (this.hitTest(hits[i], overlapThreshold)) {
						$(hits[i]).removeClass("highlight");
						if (hits[i].id === 'view') { return _this.viewPost(_this.postList[this.target.id]); }
						if (hits[i].id === 'edit') { return _this.editPost(_this.postList[this.target.id]); }
						if (hits[i].id === 'delete' && confirm("Release this note to the eternal ether?")) { 
							_this.deletePost(_this.postList[this.target.id]); 
						}
					} 
				}
				//return icon, options to original locations
				TweenMax.to(this.target, 0.7 ,{y:0, x:0});
				TweenMax.to(dragOptions, 0.7, {y:0, opacity: -1, ease: Sine.easeOut});
				TweenMax.to(fade, 0.3, {opacity:0, ease: Sine.easeOut});
			}
		});
	}

	this.viewPost = function(post) {
		this.setCurrentPost(post);
		$location.path('/view/'+post.id);
		$scope.$apply();
	}

	this.editPost = function(post) {
		this.setCurrentPost(post);
		$location.path('/edit');
		$scope.$apply();
	}
	
	this.deletePost = function(post) {
		Shared.deletePost(post.id);
		this.updatePosts();
		$scope.$apply();
	}

	this.goToEdit = function() {
		$scope.$broadcast('savePost');
		Shared.setPost(null);
	}

	this.goToGrid = function() {
		$scope.$broadcast('savePost', true)
	}

	this.setCurrentPost = function(post) {
		Shared.setPost(post);
		this.page = '';
	}

	this.updatePosts = function() {
		this.postList = Shared.getPostList();
	}

	$scope.$on('onRepeatLast', function(){
		_this.animate()
	});

	$scope.$on('updatePosts', function(){
		_this.updatePosts()
	});

	this.updatePosts();
	window.scrollTo(0,0);

}]);

