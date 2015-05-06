var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var playerSchema = mongoose.Schema({
	firstname : String,
	lastname : String,
	birthdate : Date,
	country : mongoose.Schema.ObjectId,
	position : mongoose.Schema.ObjectId,
	club : mongoose.Schema.ObjectId
});
module.exports = mongoose.model('Player', playerSchema);