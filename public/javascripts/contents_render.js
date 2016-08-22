var contents_render = (function() {

	$comics_list = $("div.comics-list");
	function getAllComics() {
		$.ajax({
			type: 'POST',
			url: '/comics',	//window.location.pathname
			async: true,
			success: function(data) {
				// emit the correct with the corresponding message
				// events.emit(data.message, data);
				if(data) populate(data);
			}
		});
	}
	function populate(data) {
		for(var key in data) {
			if(data.hasOwnProperty(key)) {
				$comics_list.append("<p><a href=" + data[key] + ">"+ key + "</a></p>");
			}
		}
	}
	getAllComics();
})();