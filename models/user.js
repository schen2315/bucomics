var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
	name: {type: String, required: true},
	sub:  {type: String, required: true},
	admin: Boolean,
	created_at: Date,
	updated_at: Date,
	comics: Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;