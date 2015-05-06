var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var clubSchema = mongoose.Schema({
	name : String,
	division : mongoose.Schema.ObjectId
});
clubSchema.methods.add = function(name, division) {
	var buffer = 0;
	if (name !== "" && division !== "") {
		this.name = name;
		this.division = division;
		this.save();
		buffer = 1;
	}
	return buffer;
};
module.exports = mongoose.model('Club', clubSchema);