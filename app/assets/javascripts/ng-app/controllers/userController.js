app.controller('UserCtrl',
			['$scope', 'User', '$location', '$firebase', '$rootScope',
	function($scope, User, $location, $firebase, $rootScope){

		// These are required for sending JSON through Rails

		// User.query(function(json){
		// 	$scope.users = json;
		// });

		// Add a new User 
		// $scope.newUser = new User();

		// this.add = function() {
		// 	$scope.newUser.$save(function(){
		// 		$scope.users.push($scope.newUser);
		// 		$scope.newUser = new User();
		// 		console.log('new user added');
		// 	});
		// };

		// // update function

		// this.destroy = function(user) {
		// 	console.log(user);
		// 	user.$delete(function() {
		// 		var position = $scope.users.indexOf(user);
		// 		$scope.users.splice(position, 1);
		// 	});
		// };
		var isNewUser = true;
		// Authenticate a User
		var ref = new Firebase("https://educationalapp.firebaseio.com/");
		var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		  if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		  // user is now authenticated with Firebase
		  } else if (user) {
		  		$scope.userName = user.displayName;
		  		$scope.userPhoto = user.thirdPartyUserData.picture.data.url;

			  	$location.path('/room').replace();
			  	console.log('user is logged in');
	      	$scope.$apply();
	      	// If the User is new, store some basic info in firebase
		  		if (isNewUser) {
		  			ref.child('users').child(user.id).set({
		  				displayName: user.displayName,
		  				provider: user.provider,
		  				provider_id: user.id,
		  				photo_url: user.thirdPartyUserData.picture.data.url
		  			});
		  		}
		  } else {
		    // user is logged out - display status
		    console.log('user not currently logged in');
		  }
		});
		   //  $scope.firstName = user.thirdPartyUserData.first_name;      	
		  	// $scope.userPhoto = user.thirdPartyUserData.picture.data.url;
		  	
		   //  console.log("User ID: " + user.uid + ", Provider: " + user.provider);
		  	// console.log(user.thirdPartyUserData.first_name);


		
			
		
		// This is the Log In function
		$scope.fbLogin = function() {
			auth.login('facebook', {
			  rememberMe: true,
			  scope: 'email, user_likes'
			});
			console.log('login pressed');
		};
			
		// This is the Logout function
		$scope.fbLogout = function() {
			auth.logout();
			// When a User logs out, send them to the root
			$location.path('/');
			console.log('logged out');
		};

	}]);
