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
	var username = '';

	function onSignIn(googleUser) {
		var profile = googleUser.getBasicProfile();
		events.emit('onSignIn', profile.getName());

		//save this somewhere so it can be accessed later.
		id_token = googleUser.getAuthResponse().id_token;
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
	function getUsername() {
		return username;
	}
	return {
		onSignIn: onSignIn,
		onSignInFailure: onSignInFailure,
		signOut: signOut,
		getIdToken: getIdToken,
		getUsername: getUsername
	}
})();