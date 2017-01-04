var mongoose = require('mongoose');
var historySchema = mongoose.Schema({
    team : mongoose.Schema.ObjectId,
    player : mongoose.Schema.ObjectId,
    action : String,
	value : Number
});
historySchema.methods.add = function(user, player, action) {
	var buffer = 0;
	
	if (user !== "" && player !== "" && action !== "") {
		this.team = user.team;
		this.player = player._id;
		this.action = action;
		this.value = player.getCurrentValue();
		this.save();
		buffer = 1;
	}
	
	return buffer;
};
module.exports = mongoose.model('History', historySchema);