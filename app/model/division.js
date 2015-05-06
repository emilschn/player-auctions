var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var divisionSchema = mongoose.Schema({
	name : String,
	country : mongoose.Schema.ObjectId
});
divisionSchema.methods.add = function(name, country) {
	var buffer = 0;
	if (name !== "" && country !== "") {
		this.name = name;
		this.country = country;
		this.save();
		buffer = 1;
	}
	return buffer;
};
module.exports = mongoose.model('Division', divisionSchema);