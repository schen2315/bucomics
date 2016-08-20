var upload = (function() {

	//rmpg = remove page
	//adpg = add page

	//cache DOM
	var $upload_Dialog = $("#upload_Dialog");
	var $upload_form = $("#upload_Dialog").find("form");
	var $onUpload = $("#onUpload");
	var $pages_list = $upload_Dialog.find("form ul");
	var $description = $("textarea.decription");
	//send ajax calls to make sure the user doesn't already
	//have an upload on his account with the same name
	var $url = $("input.url");
	var $title = $("input.title");
	var $description = $("textarea.description");
	var $exit = $("button[data-dismiss='modal']");
	var $upload_field = $("<input type='file' accept='image/*'>");
	var $content = $("div.content");
	var $addCh = $("button.addCh");
	var $adpg = $("button.adpg");

	var chapters = 0;

	//methods
	//DO delegate the event handlers
	//communicate with any other modules on the page
	//$adpg.on('click', add);
	$addCh.on('click', addCh);
	$("#submit").on('click', submit);
	$content.delegate('input[type="file"]', 'change', update);
	$content.delegate('button.rmCh','click', remove);
	$content.delegate('button.adpg', 'click', add);

	function add() {
		var $divCh = $(this).parent();
		var $upload = $("<input type='file' accept='image/*'>").appendTo($divCh);
		
		//add a new upload field
		$upload.click();
		//call update
		update();
	}
	function addCh() {
		console.log("addCh");
		$addCh.before("<div class='Ch'><h4>Chapter "+ (++chapters) + "<button class='rmCh'>-</button></h4><ul></ul><button class='adpg'>+</button></div>");
		
	}
	function remove() {
		//remove a page
		//remove string from the list
		//call update

		//div.Ch
		$(this).parent().parent().remove();
		chapters--;
		update();
	}
	function update() {
		//look at the pages array
		//for each page, create a new item in the list
		var ch = $content.find("div.Ch");
		for(var i=0; i < chapters; i++) {
			var k = 1;
			$(ch[i]).find("h4").html("Chapter " + (i + 1) + "<button class='rmCh'>-</button>");
			$(ch[i]).find("ul").empty();
			$(ch[i]).find("input[type='file']")
				.toArray().forEach(function(field) {
					if($(field).val() == "") {
						$(ch[i]).find("ul").append("<li>" + "no file chosen" + "</li>");
					} else {
						$(ch[i]).find("ul").append("<li>" + $(field).val() + "</li>");
						$(field).attr("name", "page" + k);
						k++;
					}
			});
		}
		
	}
	function submit() {
		var aggregate = new FormData();
		//find each chapter div
			//inside each are the pages
		// $.each($upload_form.find("input[type='file']"), function(i, input) {
		//     aggregate.append('1-'+i, input.files[0]);
		// });
		var ch = $content.find("div.Ch");
		for(var i=0; i < chapters; i++) {
			var k=0;
			$(ch[i]).find("input[type='file']")
				.toArray().forEach(function(field) {
					console.log(field.files[0])
					aggregate.append((i+1)+'-'+k, field.files[0]);
					k++;
				})
		}
		console.log(aggregate);
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