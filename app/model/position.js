var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var positionSchema = mongoose.Schema({
	name : String
});
positionSchema.methods.add = function(name) {
	var buffer = 0;
	if (name !== "") {
		this.name = name;
		this.save();
		buffer = 1;
	}
	return buffer;
};
module.exports = mongoose.model('Position', positionSchema);