var mongoose = require('mongoose');
var playerSchema = mongoose.Schema({
	firstname : String,
	lastname : String,
	birthdate : Date,
	country : mongoose.Schema.ObjectId,
	position : mongoose.Schema.ObjectId,
	club : mongoose.Schema.ObjectId,
	currentValue : Number
});

playerSchema.methods.getCurrentValue = function() {
	var buffer = 1;
	if (this.currentValue > 1) {
		buffer = this.currentValue;
	}
	return buffer;
};
playerSchema.methods.getBuyingValue = function() {
	var buffer = this.getCurrentValue();
	buffer++;
	return buffer;
};
playerSchema.methods.getSellingValue = function() {
	var buffer = this.getCurrentValue();
	return buffer;
};

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

playerSchema.methods.updateValue = function( type, callback ) {
	var newValue = this.getCurrentValue();
	if (type === 'buy') {
		newValue++;
	}
	if (type === 'sell') {
		newValue--;
	}
	this.currentValue = Math.max(newValue, 1);
	this.save();
	
	if ( callback !== undefined ) {
		callback();
	}
};

module.exports = mongoose.model('Player', playerSchema);