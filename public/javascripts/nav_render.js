var nav_render = (function() {


	//cache DOM
	var path = window.location.pathname;
	var $nav_user = $('li.nav-user');
	var $g_signin2 = $('li a div#my-signin2');
	var $sign_out = $nav_user.find('ul li.sign-out');

	//bind events

	//these events gets called no matter what page a user is on
	$sign_out.on('click', auth.signOut /* auth.signOut*/);
	events.on('onSignIn', nav_render);

	//then, after a user is signed in 
	// events.on('profile', profile_render);

	function nav_render(name) {
		$g_signin2.parent().parent().css({'display':'none'});
		$nav_user.show().children('a').text(name.toString().split(" ")[0]);
	}
	
})();