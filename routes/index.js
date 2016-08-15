var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');
var https = require('https');
var inspect = require('util').inspect;
var parser = require('./../public/javascripts/parser');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Binghamton Comics' });
});

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

module.exports = router;
