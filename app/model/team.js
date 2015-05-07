var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var teamSchema = mongoose.Schema({
	name : String,
	manager : mongoose.Schema.ObjectId,
	goalkeeper : mongoose.Schema.ObjectId,
	defender : mongoose.Schema.ObjectId,
	midfield : mongoose.Schema.ObjectId,
	attacker : mongoose.Schema.ObjectId
});
teamSchema.methods.add = function(name, user) {
	var buffer = 0;
	if (name !== "") {
		this.name = name;
		this.save();
		
		user.team = this.id;
		user.save();
		buffer = 1;
	}
	return buffer;
};
module.exports = mongoose.model('Team', teamSchema);