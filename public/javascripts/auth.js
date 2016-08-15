function renderButton() {
	gapi.signin2.render('my-signin2', {
		'scope': 'profile email',
        'width': 150,
        'height': 30,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': auth.onSignIn,
        'onfailure': auth.onSignInFailure
	});
}

var auth = (function() {

	var id_token = '';
<<<<<<< HEAD
	var username = '';

	function onSignIn(googleUser) {
		var profile = googleUser.getBasicProfile();
=======

	function onSignIn(googleUser) {
		var profile = googleUser.getBasicProfile();
		//console.log(googleUser.getBasicProfile());
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
		events.emit('onSignIn', profile.getName());

		//save this somewhere so it can be accessed later.
		id_token = googleUser.getAuthResponse().id_token;
<<<<<<< HEAD
		username = profile.getName();
		$.ajax({
			type: 'POST',
			url: '/profile',	//window.location.pathname
			data: {id_token: id_token},
			async: true,
			success: function(data) {
				// emit the correct with the corresponding message
				// events.emit(data.message, data);
				console.log(data);
=======

		$.ajax({
			type: 'POST',
			url: '/',	//window.location.pathname
			data: {id_token: id_token},
			success: function(data) {
				// emit the correct with the corresponding message
				// events.emit(data.message, data);
				//console.log(data);
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
			}
		});
	}
	function onSignInFailure() {
		console.log('User could not be signed in');
	}
	function signOut() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
		  console.log('User signed out.');
		});
	}
	function getIdToken() {
		return id_token;
	}
<<<<<<< HEAD
	function getUsername() {
		return username;
	}
=======
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
	return {
		onSignIn: onSignIn,
		onSignInFailure: onSignInFailure,
		signOut: signOut,
<<<<<<< HEAD
		getIdToken: getIdToken,
		getUsername: getUsername
=======
		getIdToken: getIdToken
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
	}
})();