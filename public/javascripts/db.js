var User = require('./../../models/user');
var Comics = require('./../../models/comics');
var _ = require('underscore');
var isValidURL  = require('./isValidURL');
var db = (function() {

	function doesUserExist(auth, callback) {
		User.find({sub: auth.sub}, function(err, user) {
			if(err) throw err;
			if(_.isEmpty(user)) {
				var newUser = User({
					name: auth.name,	
					sub: auth.sub,	//user's unique Google ID.
									//whenever a user wants to do something
									//their sub must be checked
									//to identify that user.
					created_at: new Date(),
					updated_at: new Date()
				})
				newUser.save(function(err) {
					if(err) throw err;
					callback(auth.name + " was added!");
				});
			} else {
				callback(auth.name + " exists");
			}
		});
	}
	function upload(auth, params, callback) {

		//eventually, need to give error messages to the router function

		//check that url is valid (no spaces)
		//check that chapters is not empty
		console.log(isValidURL(params.url));
		if(!isValidURL(params.url) 
			|| _.isEmpty(params.chapters[0])
			|| params.title == ""
			|| params.author == "" ) {
			console.log("invalid URL");
			callback(false);
			return
		}
		User.find({sub: auth.sub}, function(err, user) {
			if(err) throw err;
			user = user[0];
			//make sure the comic with the particular url
			//does not already exist
			Comics.find({url: params.url}, function(err, comics) {
				if(_.isEmpty(comics)) {
					//check if the params.url already exists in user.comics
						//if yes, operation fails and callback false and return
					for(var i =0; i < user.comics.length; i++) {
						if(user.comics[i] == params.url) {
							console.log("a comic with the same url already exists for the user");
							callback(false);
							return;
						}
					}
					user.comics.push(params.url);
					user.updated_at = new Date();
					user.save(function(err) {
						if (err) throw err;
						var comic = 
						new Comics({
							title: params.title,
							author: params.author,
							url: params.url,
							description: params.description,
							chapters: params.chapters,
							created_at: new Date()
						});
						comic.save(function(err) {
							callback(true);
						});
					});
				} else {
					//comic already exists so operation fails
					console.log("comic already exists");
					callback(false);
				}
			});
		});
	}

	function update(auth, params, callback) {
		//params will contain the 
		//remove + rearrange + add information

		//find particular user
		//check that params is valid
		//callback false if neither is satisfied

		
	}
	function del(auth, params, callback) {

	}
	//figure out a clean way to write this out
	//may change name to profile (db.profile)
	function getProfile(auth, callback) {
		// var data = {};
		// User.find({sub: auth.sub}, function(err, user) {
		// 	data = user[0];
		// });
	}
	//look at the url 
	//get info (title, chapter, etc)
	//render the view template
	//send response to client
	//may change function name to JUST comics (db.comics)
	function getComics(url, callback) {
		var data = {};
		//return object to pass into the render function
		url = url.split("/");
		url.splice(0, 1);
		url[1] = url[1] ? parseInt(url[1]) : 1;	//chapter
		url[2] = url[2] ? parseInt(url[2]) : 1;	//page
		Comics.find({url: url[0]}).lean().exec(function(err, comics) {
			if(err) throw err;
			if(_.isEmpty(comics)) {
				//data is empty
				callback(data);
				return
			}
			comics = comics[0];
			data.url = url;
			data.title = comics.title;
			data.description = comics.description;
			data.author = comics.author;
			
			if(comics.chapters[url[1] - 1][url[2] - 1]) {
				data.chapter = url[1]; //considered chapter 1
				data.page = url[2];
				data.pagesrc = "/comics/" + url[0] + "/" + url[1] + "/" +
					comics.chapters[url[1] - 1][url[2] - 1];
				data.chapters = comics.chapters;
				data.pages = comics.chapters[url[1] - 1].length;
			}

			data.chapters = [];
			for(var i=0; i < comics.chapters.length; i++) {
				data.chapters[i] = "/comics" + url[0] + "/" + (i+1).toString() 
				+ "/1"; 
			}
			data.pages = [];
			for(var i=0; i < comics.chapters[url[1] - 1].length; i++) {
				data.pages[i] = "/comics" + url[0] + "/" + url[1] + "/" 
				+ (i+1).toString();
			}
			//next page or next chapter	
			if(comics.chapters[url[1] - 1][url[2]]) {
				data.next = "/comics/" + url[0] + "/" + url[1] + "/" + 
					(url[2] + 1).toString();
			} else if(comics.chapters[url[1]]) {
				data.next = "/comics/" + url[0] + "/" +
					(url[1] + 1).toString() + "1";
			}
			//prev page or prev chapter
			if(comics.chapters[url[1] - 1][url[2] - 2]) {
				data.prev = "/comics/" + url[0] + "/" + url[1] + "/" +
					(url[2] - 1).toString();	
			} else if(comics.chapters[url[1] - 2]) {
				data.next = "/comics/" + url[0] + "/" +
					(url[1] - 1).toString() + "1";
			}

			callback(data);
		});
	}

	return {
		doesUserExist: doesUserExist,
		upload: upload,
		update: update,
		del: del,
		getProfile: getProfile,
		getComics: getComics
	}
})();

module.exports = db;