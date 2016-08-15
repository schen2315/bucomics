//profile
var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');
var randomstring = require('randomstring');
var multer = require('multer');
<<<<<<< HEAD
var parseFiles = require('./../public/javascripts/parseFiles');
var parser = require('./../public/javascripts/parser');
var path = require('path');
var ncp = require('ncp').ncp;
	ncp.limit = 16;
var rimraf = require('rimraf');
var fs = require('fs');

//user profile page
=======
var storageEngine = require('./../public/javascripts/storageEngine');
// var storage = storageEngine({
// 	destination: function(req, file, cb) {
// 		cb(null, './../public/comics/' + file.originalname);
// 	}
// });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../public/comics')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
})
var upload = multer({storage: storage}).single('userPhoto');

>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
router.get('/', function(req, res, next) {
	//check that a user is logged in
	//something to figure out later ...
	res.render('profile', {});
});
<<<<<<< HEAD
//authenticate user
router.post('/', function(req, res, next) {
	parser(req, '/profile', function() {
		var token = req.params.id_token;
		client2db('/profile', token, function(data) {
			if(!data.error) {
				res.send('authentication successful');
			} else {
				//error handling
			}
		});
	});
});

router.post('/upload', function(req, res, next) {
	// req.params is updated
	parseFiles(req, '/profile/upload/', function() {
		//first authenticate user
		client2db('/profile', req.params.id_token, function(auth) {
			if(!auth.error) {
				//call the proper db function
				db.upload(auth, req.params, function(data) {
					//change name of tempdir
					if(data) {
						ncp(req.params.tempdir, __dirname + "/../public/comics/" + req.params.url, function(err) {
							if (err) throw err;
							rimraf(req.params.tempdir, function(err) {
								if(err) throw err;
							})
							res.send("successfully saved " +
								req.params.title + "to " + req.params.url);
						});	
					} else {
						//remove the tempdir
						rimraf(req.params.tempdir, function(err) {
							if(err) throw err;
							res.send("failed to save " + req.params.title);
						});
					}
				});
			} else {
				//do something with error
				rimraf(req.params.tempdir, function(err) {
					if(err) throw err;
					res.send("failed to save " + req.params.title);
				});
			}
		});
=======
router.post('/', function(req, res, next) {
	var token = req.body.id_token;
	client2db('/profile', token, function(data) {
		res.send(data);
	});
});
router.post('/upload/artwork', function(req, res, next) {

});
router.post('/upload/comics', function(req, res, next) {

	//first authenticate user
	//call the storageEngine function in the callback 
	//of client2db function
	// client2db('/upload/comics', token, function(data) {
	// 	upload(req, res, function(err) {
	// 		if(err) return res.send("Error uploading file");
	// 		res.send(data);
	// 	});
	// });
	upload(req, res, function(err) {
		if(err) return res.end("Error uploading file");
		console.log(req.body);
		console.log(req.file);
		console.log(req.files);
		res.end('File is uploaded');
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
	});
});

module.exports = router;