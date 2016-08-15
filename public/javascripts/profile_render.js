var profile_render = (function() {

	//cache DOM
	$uploadColumn = $("div.row div:nth-child(2)");
	uploadFields = $("#uploadFields").html();
	$uploadButton = $("#upload");
	//bind events
	$uploadButton.on('click', submitType);
	$uploadColumn.on('submit', "#uploadForm", submit);
	$uploadColumn.on('click', 'input[type="radio"]', addUploadField);
	//methods
	function addUploadField() {
		// $uploadButton.hide();
		// $uploadColumn.append('<div class="btn btn-info">Finish</div>');
		// $uploadColumn.append('<form id="uploadForm"enctype="multipart/form-data"method="post"><input type="file" name="userPhoto" accept="image/*"/><span>name:</span><input type="text" name="name"><input type="submit" value="Upload Image" name="submit"><span id="status"></span></form>');
		$uploadColumn.append(uploadFields);
	}
	function submitType() {
		
	}
	function submit() {

		//return false so the page doesn't reload
		return false;
	}
	//return values
})();