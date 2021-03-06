var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var comicsSchema = new Schema({
	title: {type: String, required: true},
	author: {type: String, required: true},
	url: {type: String, required: true},	//must be all lowercase
	description: {type: String},
	chapters: Array, //each entry will represent each chapter containing an object
					 //within each object should be an entry representing the page
					 //in that chapter and a key with the path to the page
	created_at: Date,
	updated_at: Date //on update, update with current date

});

var Comics = mongoose.model('Comics', comicsSchema);

module.exports = Comics;
