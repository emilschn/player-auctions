/**
 * PAGE - ACCOUNT/TEAM
 */

/**
 * Display
 * Team
 */
exports.execute = function(req, res){
	// Gets the team of the current player
	var Team = require('../model/team');
	Team.findOne({'_id': req.user.team}, function(err, userTeam) {
		
		if (userTeam === null) {
			res.render('pages/team.ejs', {user : req.user, userTeam: {}, playerList: []});
			
		} else {
			// Gets the player IDs list of the team
			var playerIdList = userTeam.players.map(function(player) { return player.id; } );

			// 
			var Player = require('../model/player');
			Player.find({ "_id": { "$in": playerIdList } }, function(err, dbPlayerList) {

				var playerList = dbPlayerList.map(function(dbPlayer) {
					var objectPlayer = new Object();
					objectPlayer.id = dbPlayer._id;
					objectPlayer.firstname = dbPlayer.firstname;
					objectPlayer.lastname = dbPlayer.lastname;
					objectPlayer.currentValue = dbPlayer.getCurrentValue();
					objectPlayer.sellingValue = dbPlayer.getSellingValue();
					var countUserTeamPlayers = userTeam.players.length;
					for (i = 0; i < countUserTeamPlayers; i++) {
						if (userTeam.players[i].id) {
							objectPlayer.initValue = userTeam.players[i].amount;
							objectPlayer.date = userTeam.players[i].date;
						}
					}
					return objectPlayer;
				});

				res.render('pages/team.ejs', {user : req.user, userTeam: userTeam, playerList: playerList});

			});
			
		}
		
	});
};

/**
 * Post
 */
exports.post = function(req, res) {
	var Team = require('../model/team');
	var newTeam = new Team();
	if (newTeam.add(req.param('name'), req.user)) {
		res.redirect('/monequipe');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};

exports.postSellPlayer = function(req, res) {
	//Récupération du joueur ajouté
	var Player = require('../model/player');
	Player.findOne({'_id': req.param('playerId')}, function(err, player) {
		if (player !== null) {
			
			//Commence par l'ajouter à l'historique des actions
			var History = require('../model/history');
			var newHistory = new History();
			if (newHistory.add(req.user, player, 'sell')) {

				//Met à jour la liste des joueurs de l'équipe
				var Team = require('../model/team');
				var updateTeam = new Team();
				updateTeam.removePlayer(req.user.team, req.param('playerId'));

				//Redirige vers l'équipe
				res.redirect('/monequipe');
				
			}
			
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Il y a au moins un champ vide !');
		}
	});
	
};