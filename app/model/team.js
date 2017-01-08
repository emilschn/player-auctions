var mongoose = require('mongoose');
var app_define = require('../define.js');

/**
 * Entity - Team : team managed by a user
 * String name
 * ObjectId manager
 * Number money
 * Array players : id, date, amount
 */
var teamSchema = mongoose.Schema({
	name: String,
	manager: mongoose.Schema.ObjectId,
	money: Number,
	players: [mongoose.Schema.Types.Mixed]
});

//******************************************************************************
// Methods to access data
//******************************************************************************
/*
 * Returns the current amount of money of the team
 * @returns Number
 */
teamSchema.methods.getCurrentMoney = function() {
	// Valeur par défaut : 0
	var buffer = 0;
	// Si la valeur est définie en bas de données, on la récupère
	if (this.money !== undefined) {
		buffer = this.money;
	// Si la valeur n'est pas définie, on récupère la valeur par défaut
	} else {
		buffer = app_define.team_init_money;
	}
	return buffer;
};

//******************************************************************************
// Methods to store data
//******************************************************************************
/**
 * Enregistre une équipe liée à un compte utilisateur
 * @param String name
 * @param ObjectId user
 * @returns Boolean
 */
teamSchema.methods.add = function(name, user) {
	var buffer = false;
	if (name !== "") {
		// Création de l'équipe avec nom et liaison à l'utilisateur
		this.name = name;
		this.manager = user.id;
		this.money = app_define.team_init_money;
		this.save();
		
		// Attribution de l'équipe au compte utilisateur
		user.team = this.id;
		user.save();
		buffer = true;
	}
	return buffer;
};

/**
 * Ajoute un joueur dans la liste de l'équipe
 * @param User user
 * @param Player player
 * @returns Boolean
 */
teamSchema.methods.addPlayer = function(user, player) {
	var buffer = false;
	
	//TODO : comparer joueurs de l'équipe et joueur ajouté pour controler les doublons
	var Team = mongoose.model('Team', teamSchema);
	Team.findOne({'_id': user.team}, function(err, team) {
		var newData = new Object();
		newData.players = team.players;
		var newPlayerData = new Object();
		newPlayerData.id = player._id;
		var date = new Date();
		newPlayerData.date = date;
		newPlayerData.amount = player.getBuyingValue();
		newData.players.push(newPlayerData);
		newData.money = team.getCurrentMoney() - player.getBuyingValue();
		Team.findOneAndUpdate( {'_id': user.team}, newData, {upsert:false}, function(err, doc){
			if (!err) {
				//Met à jour la valeur du joueur acheté
				player.updateValue('buy');
				buffer = true;
			}
		} );
	});
	
	return buffer;
};


teamSchema.methods.removePlayer = function(teamId, playerId) {
	var buffer = false;
	
	var Player = require('./player');
	Player.findOne( {'_id': playerId}, function(err, player) {
		var Team = mongoose.model('Team', teamSchema);
		Team.findOne({'_id': teamId}, function(err, team) {
			var newData = new Object();
			newData.players = team.players;
			
			var countPlayers = newData.players.length;
			for (var i = countPlayers - 1; i >= 0; i--) {
				if (newData.players[i].id == playerId) {
					newData.players.splice(i, 1);
					break;
				}
			}
			
			newData.money = team.getCurrentMoney() + player.getSellingValue();
			Team.findOneAndUpdate( {'_id': teamId}, newData, {upsert:false}, function(err, doc){
				if (!err) {
					player.updateValue('sell');
					buffer = true;
				}
			} );
		});
	} );
	
	return buffer;
};
module.exports = mongoose.model('Team', teamSchema);