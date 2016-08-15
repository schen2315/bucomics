/*
	This function serves to authenticate a user. When a
	post ajax request comes in from from the frontend 
	(when a google user signs in) the 
	function takes the token and sends an https get request
<<<<<<< HEAD
	to a google authentication server to receive the sub 
	string that identifies the user. If there were no errors
	identifying a user based on his/her id_token
	then send back 'success'
=======
	to a google authentication server. If a user is 
	authenticated, then further action is taken based on 
	what the user wanted (by looking at the url). 

>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
*/

var db = require('./db');
var https = require('https');
<<<<<<< HEAD
//my google API clientID
=======
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
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
<<<<<<< HEAD
				//add the user if he is not in the database
				db.doesUserExist(auth, function() {
					//return the auth that identifies the user
					callback(auth);	
				});
=======
				db.doesUserExist(auth);  //add the user if he is not in the database
				//next response will generate response based on url.
				var path = "/" + url.toString().split("/")[1];
				switch(path) {
					case "/":
						break;
					case "/profile":
						var data = db.resProfile(auth);
						data.message = "profile"
						callback(data);
						break;
					default:
						//get user information so that the users' collection is updated
						//get title + description to create a new comics document
						//if it doesn't already exist
						//call the upload function to save files 
						//to storage and update the respective mongo documents
						callback(data);
				}
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
			} else {
				callback({error: 'User could not be authenticated'});
			}	
		});
	}).on('error', function(e) {
		callback({error: e});
	});
}

module.exports = client2db;