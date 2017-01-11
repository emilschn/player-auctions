/**
 * PAGE - ACCOUNT/TEAM
 */

/**
 * Display
 * Team
 */
exports.prepare = function(req, res){
	// Gets the team of the current player
	var Team = require('../../model/team');
	Team.findOne({'_id': req.user.team}, function(err, userTeam) {
		
		if (userTeam === null) {
			res.render('pages/team.ejs', {user : req.user, userTeam: {}, playerList: []});
			
		} else {
			// Gets the player IDs list of the team
			var playerIdList = userTeam.players.map(function(player) { return player.id; } );

			// 
			var Player = require('../../model/player');
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