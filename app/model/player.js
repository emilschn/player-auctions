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
playerSchema.methods.add = function(firstname, lastname, country, position, club) {
	var buffer = 0;
	if (firstname !== "" && lastname !== "" && country !== "" && position !== "" && club !== "") {
		this.firstname = firstname;
		this.lastname = lastname;
		this.country = country;
		this.position = position;
		this.club = club;
		this.save();
		buffer = 1;
	}
	return buffer;
};
module.exports = mongoose.model('Player', playerSchema);