var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var countrySchema = mongoose.Schema({
	name : String
});
countrySchema.methods.add = function(name) {
	var buffer = 0;
	if (name !== "") {
		this.name = name;
		this.save();
		buffer = 1;
	}
	return buffer;
};
module.exports = mongoose.model('Country', countrySchema);