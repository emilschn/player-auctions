var mongoose = require('mongoose');
var teamSchema = mongoose.Schema({
	name : String,
	manager : mongoose.Schema.ObjectId,
	players : Array
});
teamSchema.methods.add = function(name, user) {
	var buffer = 0;
	if (name !== "") {
		this.name = name;
		this.manager = user.id;
		this.save();
		
		user.team = this.id;
		user.save();
		buffer = 1;
	}
	return buffer;
};
teamSchema.methods.addPlayer = function(user, player) {
	var buffer = 0;
	
	//TODO : comparer joueurs de l'équipe et joueur ajouté pour controler les doublons
	var Team = mongoose.model('Team', teamSchema);
	Team.findOne({'_id': user.team}, function(err, team) {
		var newData = new Object();
		newData.players = team.players;
		newData.players.push(player._id);
		Team.findOneAndUpdate( {'_id': user.team}, newData, {upsert:false}, function(err, doc){
			if (!err) buffer = 1;
		} );
	});
	
	return buffer;
};
teamSchema.methods.removePlayer = function(teamId, playerId) {
	var buffer = 0;
	
	var Team = mongoose.model('Team', teamSchema);
	Team.findOne({'_id': teamId}, function(err, team) {
		var newData = new Object();
		newData.players = team.players;
		var countPlayers = newData.players.length;
		for (var i = countPlayers - 1; i >= 0; i--) {
			if (newData.players[i] == playerId) {
				newData.players.splice(i, 1);
				break;
			}
		}
		Team.findOneAndUpdate( {'_id': teamId}, newData, {upsert:false}, function(err, doc){
			if (!err) buffer = 1;
		} );
	});
	
	return buffer;
};
module.exports = mongoose.model('Team', teamSchema);