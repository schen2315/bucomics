var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');
var https = require('https');
<<<<<<< HEAD
var inspect = require('util').inspect;
var parser = require('./../public/javascripts/parser');
=======
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Binghamton Comics' });
});
<<<<<<< HEAD

//functionally, this should not be here
//authentication should happen only 
//on '/profile' routes
// router.post('/', function(req, res, next) {
// 	parser(req, '/', function() {
// 		var token = req.params.id_token;
// 		client2db('/', token, function(data) {
// 			res.send(data);
// 		});
// 	});
// });
=======
router.post('/', function(req, res, next) {
	var token = req.body.id_token;
	client2db('/', token, function(data) {
		res.send(data);
	});
});
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
module.exports = router;
