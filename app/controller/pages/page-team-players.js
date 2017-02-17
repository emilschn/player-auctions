/**
 * PAGE - ACCOUNT/TEAM/PLAYERS
 */

/**
 * Displays players from the team and buyable players
 */
exports.prepare = function( req, res, async ){
	var error = req.query.error;

	const entityTeam = require( '../../model/team' );
	const entityPosition = require( '../../model/position' );
	const entityPlayer = require( '../../model/player' );
	const entityClub = require( '../../model/club' );
	


	entityPosition.find( {}, function( err, positionList ) {


		// Functions that need to get launched before
		var prepareFunctionsList = [];
		// Gets the player list corresponding to the position
		prepareFunctionsList.push(
			function( callback ) {
				entityTeam.findById( req.user.team, function (err, userTeam){
					if ( err ) { return callback( err ); }
					var playerIdList = userTeam.players.map(function(player) { return player.id; } );

					entityPlayer.find({ "_id": { "$in": playerIdList } }, function(err, dbPlayerList) {
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
							
							var countPositions = positionList.length;
							for (i = 0; i < countPositions; i++) {
								if ( positionList[i]._id.equals( dbPlayer.position ) ) {
									objectPlayer.position = positionList[i].name;
								}
							}

							objectPlayer.valueDifference = (objectPlayer.currentValue - objectPlayer.initValue);
							return objectPlayer;
						});

						return callback( null, playerList );
					});
				});
			}
		);
		// Gets the clubs list
		prepareFunctionsList.push(
			function( callback ) {
				entityClub.find( {}, function( err, clubList ) {
					if ( err ) { return callback( err ); }
					return callback( null, clubList );
				} );
			}	
		);
		
		async.parallel(
			prepareFunctionsList,

			function( err, results ) {
				
				// Error checking
				var error = "";
				if ( results === null || err ) { error = "internal-error"; }
				
				var playerList = "";
				if ( results[0] === null ) { return res.sendStatus(404); }
				else { playerList = results[0]; }
				
				var clubList = "";
				if ( results[1] === null ) { error = "internal-error"; }
				else { clubList = results[1]; }
				
				// Security : test playerList and teamPlayerList to remove the players which have already been bought
				// TODO
				
				var renderParams = {
					error: error,
					user: req.user,
					position: req.params.position,
					playerList: playerList,
					positionList: positionList,
					clubList: clubList
				};
				res.render('pages/template-page-team-players.ejs', renderParams);
			}
		);


	} );
};