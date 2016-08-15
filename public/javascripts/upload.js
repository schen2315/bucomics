var upload = (function() {

	//var pages = [];
	//cache DOM
	var $upload_Dialog = $("#upload_Dialog");
	var $upload_form = $("#upload_Dialog").find("form");
	var $onUpload = $("#onUpload");
	var $pages_list = $upload_Dialog.find("form ul");
	var $add = $(".new_page");
	var $description = $("textarea.decription");
	//send ajax calls to make sure the user doesn't already
	//have an upload on his account with the same name
	var $url = $("input.url");
	var $title = $("input.title");
	var $description = $("textarea.description");
	var $exit = $("button[data-dismiss='modal']");
	var $upload_field = $("<input type='file' accept='image/*'>");

	//methods
	//DO delegate the event handlers
	//communicate with any other modules on the page
	$add.on('click', add);
	$("#submit").on('click', submit);
	$upload_form.delegate('input[type="file"]', 'change', update);


	function add() {
		var $upload = $("<input type='file' name='userphoto' accept='image/*'>")
				.appendTo("#upload_Dialog form")
		//add a new upload field
		$upload.click();		
		//call update
		update();
	}
	function remove() {
		//remove a page
		//remove string from the list
		//call update
	}
	function update() {
		//look at the pages array
		//for each page, create a new item in the list
		var i = 0;
		$pages_list.empty();
		$upload_Dialog.find("form input[type='file']")
			.toArray().forEach(function(field) {
				if($(field).val() == "") {
					$pages_list.append("<li>" + "no file chosen" + "</li>");
				} else {
					$pages_list.append("<li>" + $(field).val() + "</li>");
					$(field).attr("name", "page" + i);
					i++;
				}
		});
	}
	function submit() {
		var aggregate = new FormData();
		$.each($upload_form.find("input[type='file']"), function(i, input) {
		    aggregate.append('1-'+i, input.files[0]);
		});
		//make sure to get the id_token
		aggregate.append("url", $url.val());
		aggregate.append("id_token", auth.getIdToken());
		aggregate.append("title", $title.val());
		aggregate.append("author", auth.getUsername());
		aggregate.append("description", $description.val());

		$.ajax({
			url: "/profile/upload",
			type: "POST",
			data: aggregate,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
				console.log(data);
			},
			error: function(err) {
				console.log(err);
			}
		});
		$upload_Dialog.modal("toggle");
		$onUpload.modal({
			backdrop: 'static',
			keyboard: false
		});
		return false;
	}
})();