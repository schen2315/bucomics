var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');
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
});


module.exports = router;