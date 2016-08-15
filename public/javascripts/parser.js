var path = require('path');
var validator = require('validator');
var fs = require('fs');

var parser = function(req, url, callback) {
	if (req.busboy) {
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
	} else {
		//error handling (BE SPECIFIC!)
	}
}

module.exports = parser;