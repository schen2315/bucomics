/*
	The storageEngine creates the object given to the
	multer function to define how each file gets processed.
	In each case, after a file is saved, the path of the file
	is saved to the document. Since each file is processed
	asynchronously(assuming since it is node) we need a way of 
	knowing the page and chapter of the file if we are saving 
	a comic.
*/
var fs = require('fs');
var db = require('./db');
function getDestination(req, file, cb) {
	cb(null, './../null');
}
function storageEngine(opts) {
	opts.getDestination = (opts.destination || getDestination);
}
storageEngine.prototype._handleFile = function _handleFile(req, file, cb) {
	this.getDestination(req, file, function(err, path) {
		if(err) return cb(err);
		//save the files to storage
		//update mongo comic document
		var outStream = fs.createWriteStream(path);
		console.log(file);
		file.stream.pipe(outStream);
		outStream.on('error', cb);
		outStream.on('finish', function() {
			cb(null, {
				path: path,
				size: outStream.bytesWritten
			});
		});
	});
}
storageEngine.prototype._removeFile = function _removeFile(req, res, cb) {
	fs.unlink(file.path, cb);
}
module.exports = function(opts) {
	return new storageEngine(opts);
}



