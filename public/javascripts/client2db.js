/*
	This function serves to authenticate a user. When a
	post ajax request comes in from from the frontend 
	(when a google user signs in) the 
	function takes the token and sends an https get request
	to a google authentication server to receive the sub 
	string that identifies the user. If there were no errors
	identifying a user based on his/her id_token
	then send back 'success'
*/

var db = require('./db');
var https = require('https');
//my google API clientID
var clientid = "6211445926-lvjcjhqaq92306q1gf6tnbt97dqt0abq.apps.googleusercontent.com";
var client2db = function(url, token, callback) {
	//first portion will authorize the user
	//this right here is the problem
	https.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+token, function (res) {
		var header = res.statusCode;
		var auth = '';
		res.on('data', function(d){
			auth = auth + d;
		});
		res.on('end', function() {
			auth = JSON.parse(auth);
			if (header === 200 && auth.aud.indexOf(clientid) > -1) {
				//add the user if he is not in the database
				db.doesUserExist(auth, function() {
					//return the auth that identifies the user
					callback(auth);	
				});
			} else {
				callback({error: 'User could not be authenticated'});
			}	
		});
	}).on('error', function(e) {
		callback({error: e});
	});
}

module.exports = client2db;