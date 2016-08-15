var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
	name: {type: String, required: true},
	sub:  {type: String, required: true},
	admin: Boolean,
	created_at: Date,
	updated_at: Date,
<<<<<<< HEAD
	comics: Array
=======
	comics: Array,
	artwork: Array
>>>>>>> 9d2c945ac55304ce69e717f7268be2b63b4e933d
});

var User = mongoose.model('User', userSchema);

module.exports = User;