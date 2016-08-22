var profile_render = (function() {



	var $comics_list = $("div.comics-list");
	events.on('authenticated', isLoggedIn);
	function isLoggedIn() {
		//send a post request
		//if successful
			//populate page with json data using jquery
		//if not, tell user to log in
		id_token = auth.getIdToken();
		console.log(id_token);
		$.ajax({
			type: 'POST',
			url: '/profile/content',	//window.location.pathname
			data: {id_token: id_token},
			async: true,
			success: function(data) {
				// emit the correct with the corresponding message
				// events.emit(data.message, data);
				if(data != 'authentication unsuccessful')
					populate(data);
			}
		});
	}
	function populate(data) {
		var items = 0;
		$comics_list.empty();
		for(var key in data) {
			if(data.hasOwnProperty(key)) {
				items++;
			}
		}
		if(items == 0) {
			$comics_list.append("<p>You have no uploaded content</p>");
		} else {
			$comics_list.append("<h3>Your Comics:</h3>");
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					$comics_list.append("<p><a href=/comics/" + data[key] + ">" + key + "</a></p>");
				}
			}
		}
	}
})();