var mongoose = require('mongoose');

/**
 * Entity - History: log of buy/sell actions
 * Date date
 * ObjectId team
 * ObjectId player
 * String action
 * Number value
 */
var historySchema = mongoose.Schema({
	date: { type: Date, default: Date.now },
    team: mongoose.Schema.ObjectId,
    player: mongoose.Schema.ObjectId,
    action: String,
	value: Number
});

//******************************************************************************
// Methods to store data
//******************************************************************************
/**
 * Saves a new history item
 * @param User user
 * @param Player player
 * @param String action
 * @returns Boolean
 */
historySchema.methods.add = function(user, player, action) {
	var buffer = false;
	
	if (user !== "" && player !== "" && action !== "") {
		this.team = user.team;
		this.player = player._id;
		this.action = action;
		if (action == "sell") {
			this.value = player.getSellingValue();
		} else {
			this.value = player.getBuyingValue();
		}
		this.save();
		buffer = true;
	}
	
	return buffer;
};
module.exports = mongoose.model('History', historySchema);