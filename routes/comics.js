var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');
<<<<<<< HEAD
var _ = require('underscore');

//get an individual comic
router.get('/:title/:ch/:pg', function(req,res,next) {
	db.getComics(req.url, function(data) {
		//eventually when I do frontend
		//this will probably get overwritten
		if(!_.isEmpty(data)) res.render('view', data);
		else res.render('error');
	});
});
router.get('/:title/:ch', function(req,res,next) {
	db.getComics(req.url, function(data) {
		if(!_.isEmpty(data)) res.render('view', data);
		else res.render('error');
	});
});
router.get('/:title', function(req,res,next) {
	//return just the first page
	db.getComics(req.url, function(data) {
		if(!_.isEmpty(data)) res.render('view', data);
		else res.render('error');
	});
});

//view all user content
router.get('/', function(req, res, next) {
	res.render('contents', {});
=======

router.get('/:title/:ch/:pg', function(req,res,next) {
	db.getComics(res, req.url);
}).post('/:title/:ch/:pg', function(req,res,next) {
	//do some authentication first
}).get('/:title/:ch/', function(req,res,next) {
	res.render('view', {});
}).post('/:title/:ch/', function(req,res,next) {
	//do some authentication first
}).get('/:title/', function(req,res,next) {
	//return just the first page
	db.getComics(res, req.url);

	//res.render('view', db.getComics(req.url));
}).post('/:title/', function(req,res,next) {
	//do some authentication first
});

router.get('/', function(req, res, next) {
	res.render('contents', {});
	console.log('this is just a test')
}).post('/', function(req, res, next) {
	console.log(req.body.id_token);
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
});


module.exports = router;