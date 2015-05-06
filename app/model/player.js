var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var playerSchema = mongoose.Schema({
	firstname : String,
	lastname : String,
	birthdate : Date,
	club : Schema.ObjectId
});
module.exports = mongoose.model('Player', playerSchema);