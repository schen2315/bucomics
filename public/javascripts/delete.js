var del = (function() {

	var $delete_Dialog = $("div#delete_Dialog"),
		$modal_body = $("div#delete_Dialog div.modal-body"),
		$isyousure = $("div#isyousure"),
		$nah = $("button.cancel"),
		$del = $("button.delete");
	var to_delete = '';

	events.on('authenticated', getContent);
	$modal_body.delegate('a.title', 'click', isyousure);
	$nah.on('click', isyousure);
	$del.on('click', del);

	function getContent() {
		//render the content
		var id_token = auth.getIdToken();
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
	function isyousure() {
		$isyousure.modal("toggle");
		$delete_Dialog.modal("toggle");
		to_delete = $(this).text();
		console.log(to_delete);
	}
	function del() {
		var id_token = auth.getIdToken();
		$.ajax({
			type: 'POST',
			url: '/profile/delete',	//window.location.pathname
			data: {id_token: id_token, 
					to_delete: to_delete},
			async: true,
			success: function(data) {
				// emit the correct with the corresponding message
				if(data) {
					getContent();
					isyousure();	//something to fix later
					//getContent may not finish before isyousure gets called
				}
			}
		});
	}
	function populate(data) {
		var items = 0;
		$modal_body.empty();
		for(var key in data) {
			if(data.hasOwnProperty(key)) {
				items++;
			}
		}
		if(items == 0) {
			$modal_body.append("<p>You have no uploaded content</p>");
		} else {
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					$modal_body.append("<p><a class='title' href='#'>" + data[key] + "</a></p>");
				}
			}
		}
	}
})();