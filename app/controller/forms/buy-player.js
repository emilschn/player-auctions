exports.post = function(req, res, async) {
	//TODO: Security, test nonce
	
	// Gets the entities where data will be saved
	var aPrepareFunctions = [];
	// Gets the team of the current user
	aPrepareFunctions.push(
		function(callback) {
			var Team = require('../../model/team');
			Team.findOne({'_id': req.user.team}, function(err, userTeam) {
				if (err) {
					callback(err);
				} else {
					callback(null, userTeam);
				}
			});
		}
	);
	// Gets the player that we are trying to add
	aPrepareFunctions.push(
		function(callback) {
			var Player = require('../../model/player');
			Player.findOne( { '_id': req.body.player }, function(err, player) {
				if (err) {
					callback(err);
				} else {
					callback(null, player);
				}
			});
		}
	);
	
	
	async.parallel(
		aPrepareFunctions,
		
		// Once data is loaded, execute
		function(err, results) {
			var error = "";
			
			// Error checks
			if (err) {
				console.log("forms/buy-player : " + err);
				error = "internal-error";
			}
			if (results == null || results[0] == null) {
				console.log("forms/buy-player : team not found");
				error = "team-not-found";
			}
			if (results[1] == null) {
				console.log("forms/buy-player : player not found");
				error = "player-not-found";
			}
			
			if (error != "") {
				res.redirect('/monequipe?error='+error);
				
				
			} else {
				// Useful data
				var userTeam = results[0];
				var player = results[1];

				// Is the money in the wallet sufficient to buy the player?
				if ( userTeam.getCurrentMoney() < player.getBuyingValue() ) {
					console.log("forms/buy-player : not enough money");
					error = "not-enough-money";
				}

				// Is the player already in the player team?
				var nPlayers = userTeam.players.length;
				console.log( "nPlayers = " + nPlayers );
				console.log( "player._id = " + player._id );
				for ( var i = 0; i < nPlayers; i++ ) {
					console.log( "userTeam.players["+i+"].id = " + userTeam.players[i].id );
					if ( userTeam.players[i].id.equals( player._id ) ) {
						console.log("forms/buy-player : player already in team");
						error = "player-already-in-team";
						break;
					}
				}
			
			
				if (error != "") {
					res.redirect('/monequipe?error='+error);

				} else {
					// Functions to be executed before the redirection
					var aSaveFunctions = [];
					// Saves in the history
					aSaveFunctions.push(
						function(callback) {
							var History = require('../../model/history');
							var newHistory = new History();
							newHistory.add( userTeam, player, 'buy', callback );
						}
					);
					// Adds the player in the team
					aSaveFunctions.push(
						function(callback) {
							userTeam.addPlayer(player, callback);
						}
					);

					async.parallel(
						aSaveFunctions,

						// Once data is loaded, execute
						function(err, results) {

							//Met à jour la valeur du joueur acheté
							player.updateValue( 'buy', function() {
								//Redirige vers l'équipe
								res.redirect('/monequipe');
							} );

						}
					);
				}
			}
		}
	);
};