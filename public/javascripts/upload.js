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
<<<<<<< HEAD
	var $url = $("input.url");
	var $title = $("input.title");
	var $description = $("textarea.description");
=======
	var $title = $("input.title");
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
	var $exit = $("button[data-dismiss='modal']");
	var $upload_field = $("<input type='file' accept='image/*'>");

	//methods
	//DO delegate the event handlers
	//communicate with any other modules on the page
	$add.on('click', add);
<<<<<<< HEAD
	$("#submit").on('click', submit);
=======
	$upload_form.on('submit', submit);
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
	$upload_form.delegate('input[type="file"]', 'change', update);


	function add() {
<<<<<<< HEAD
		var $upload = $("<input type='file' name='userphoto' accept='image/*'>")
=======
		var $upload = $("<input type='file' name='userPhoto' accept='image/*'>")
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
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
<<<<<<< HEAD
		var i = 0;
=======
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
		$pages_list.empty();
		$upload_Dialog.find("form input[type='file']")
			.toArray().forEach(function(field) {
				if($(field).val() == "") {
					$pages_list.append("<li>" + "no file chosen" + "</li>");
				} else {
					$pages_list.append("<li>" + $(field).val() + "</li>");
<<<<<<< HEAD
					$(field).attr("name", "page" + i);
					i++;
=======
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
				}
		});
	}
	function submit() {
<<<<<<< HEAD
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
=======
		//do the necessary ajax call stuff
		//DO redirect the page
		var aggregate = new FormData();
		var files = $upload_form.find("input[type='file']");
		var numFiles = files.length;
		for(var i=0; i< numFiles; i++) {
			aggregate.append("fileToUpload[]", files[i]);
		}
		$.ajax({
			url: "/profile/upload/comics",
			type: "POST",
			data: aggregate,
			async: true,
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
<<<<<<< HEAD
				console.log(data);
			},
			error: function(err) {
				console.log(err);
			}
		});
=======
				//window.location.href = '/';
				console.log(data);
			}
		});
		// var url = 'http://localhost:3000/profile/upload/comics';
		// var opts = {
		// 	method: 'POST',
		// 	body: aggregate
		// }
		// fetch(url, opts).then(function(res) {
		// 	res.text();
		// }).then(function(data) {
		// 	alert(data);
		// }).catch(function(err) {
		// 	alert('failed');
		// })
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
		$upload_Dialog.modal("toggle");
		$onUpload.modal({
			backdrop: 'static',
			keyboard: false
		});
		return false;
	}
})();