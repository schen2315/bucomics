var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');

router.get('/', function(req, res, next) {
	res.render('error', {});
});

module.exports = router;