var path = require('path');
var validator = require('validator');
var fs = require('fs');
//check if dir exists, create it if it doesn't
function checkDirectory(directory, callback) {
	fs.stat(directory, function(err, stats) {
		//check the specific err code
		if(err && err.errno === -2) {
			//Create directory, call the callback
			fs.mkdir(directory, callback);
		} else if(stats && stats.isDirectory()) {
			//directory already exists
			callback();
		} else if(err) {
			//if different error
			callback(err);
		} else throw "err in checkDirectory :none of the above satisfied";
	});
}

var parseFiles = function(req, url, callback) {
	//create a temp dir with a unique name
	//so that the same dir does not
	//get used for simultaneous calls
	if (req.busboy) {
		req.params = {
			tempdir: "",
			url: "",
			id_token: "",
			title: "",
			author: "",
			description: "",
			chapters: []
		}
		fs.mkdtemp(__dirname + '/../comics/tempdir-', function(err, tempdir) {
			if(err) console.log(err);
			req.params.tempdir = tempdir;	
		    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

		    	fieldname = validator.escape(fieldname);
		    	var ch_pg = fieldname.split("-");
		    	var tempdir_1 = tempdir + '/' + ch_pg[0];
		    	checkDirectory(tempdir_1, function(err) {
		    		if(err) throw err;
		    		var saveTo = path.join(tempdir_1, path.basename(filename));
					file.pipe(fs.createWriteStream(saveTo));
					if(!req.params.chapters[ch_pg[0] -1]) {
						//if chapter doesn't exist
						req.params.chapters[ch_pg[0] - 1] = [];
					}
					req.params.chapters[ch_pg[0] - 1][ch_pg[1]] = filename;
		    	});
		    });
		    req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
		      req.params[fieldname] = validator.escape(val);
		    });
		    req.busboy.on('error', function(err) {
		    	console.log(err);
		    });
		    req.busboy.on('finish', function() {
		      callback();
		    });
		    req.pipe(req.busboy);
		});
	} else {
		//error handling (BE SPECIFIC!)
	}
}

module.exports = parseFiles;