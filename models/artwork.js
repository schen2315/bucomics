var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schema
var artworkSchema = new Schema({
	piece: {type: String, required: true},
	author: {type: String, required: true},
	description: {type: String},
	created_at: Date,
	updated_at: Date
});

var Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;