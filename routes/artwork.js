var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');

router.get('/', function(req, res, next) {
	res.render('contents', {});
}).post('/', function(req, res, next) {
	
	console.log(req.body.id_token);
});

router.get('/:piece', function(req, res, next) {

}).post('/:piece', function(req, res, next) {

});

module.exports = router;