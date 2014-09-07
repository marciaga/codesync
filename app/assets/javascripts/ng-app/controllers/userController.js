app.controller('UserCtrl',
			['$scope', 'User', '$location',
	function($scope, User, $location){

		User.query(function(json){
			$scope.users = json;
		});

		// Add a new User 
		$scope.newUser = new User();

		this.add = function() {
			$scope.newUser.$save(function(){
				$scope.users.push($scope.newUser);
				$scope.newUser = new User();
				console.log('new user added');
			});
		};

		// update function

		this.destroy = function(user) {
			console.log(user);
			user.$delete(function() {
				var position = $scope.users.indexOf(user);
				$scope.users.splice(position, 1);
			});
		};
		// Initialize a new Firebase for OAUTH
		var ref = new Firebase("https://educationalapp.firebaseio.com/");
		var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		  if (user) {
		    // the access token will allow us to make Open Graph API calls
		    console.log(user.accessToken);
		  }
		});

		// Authenticate with Facebook
		$scope.fbLogin = function() {
			auth.login('facebook', {
			  rememberMe: true,
			  scope: 'email,user_likes'
			});
		};
		// Logout via Facebook
		$scope.fbLogout = function() {
			auth.logout();
			// When a User logs out, send them to the root
			$location.path('/');
			console.log('logged out');
		};
		
		var myRef = new Firebase("https://educationalapp.firebaseio.com/");
		var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
		  if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		  } else if (user) {
		    // user authenticated with Firebase
		    console.log("User ID: " + user.uid + ", Provider: " + user.provider);
		    console.log(user.displayName);

		    // send logged in User to the Main Room
		   	
        $location.path('/room').replace();
        $scope.$apply();
		  } else {
		    // user is logged out
		    console.log('not logged in');
		  }
		});




	}]);
