/**
 * PAGE - ACCOUNT/TEAM
 */

/**
 * Display
 * Team
 */
exports.prepare = function( req, res, async ){
	var error = req.query.error;

	// Gets the team of the current player
	var Team = require('../../model/team');
	Team.findOne( {'_id': req.user.team}, function(err, userTeam) {

		if (userTeam === null) {
			res.render('pages/template-page-team-dashboard.ejs', { user : req.user, userTeam: {}, playerList: [], error: error });

		} else {

			// Gets all history items from the players, after they've been bought
			var entityHistory = require('../../model/history');
			var asyncFunctions = [];
			var countTeamPlayers = userTeam.players.length;
			for ( var i = 0; i < countTeamPlayers; i++ ) {

				(function(i) {
					asyncFunctions.push( function( callback ) {

						entityHistory.find(
							{ player: userTeam.players[i].id, date: { $gte: userTeam.players[i].date } },
							function ( err, historyItem ) {
								if ( err ) { return callback( err ); }
								return callback( null, historyItem );
							}
						);

					} );
				})(i);

			}
	
			// Once the history of each player loaded
			async.parallel(
				asyncFunctions,

				function( err, results ) {
					
					// Error checking
					var error = "";
					if ( results === null || err ) { error = "internal-error"; }
					
					// Calculation of all the variations
					var variation = 0;
					var variationDay = 0;
					var variationWeek = 0;
					var countResults = results.length;
					for ( var i = 0; i < countResults; i++ ) {

						var dateYesterday = new Date();
						dateYesterday.setDate( dateYesterday.getDate() - 1 );
						var dateLastWeek = new Date();
						dateLastWeek.setDate( dateLastWeek.getDate() - 7 );

						var countHistoryItems = results[i].length;
						for ( var j = 0; j < countHistoryItems; j++ ) {
							if ( results[i][j].action == "sell" ) {
								variation -= 1;
								if ( results[i][j].date > dateLastWeek ) {
									variationWeek -= 1;
									if ( results[i][j].date > dateYesterday ) {
										variationDay -= 1;
									}
								}
							}
							if ( results[i][j].action == "buy" ) {
								variation += 1;
								if ( results[i][j].date > dateLastWeek ) {
									variationWeek += 1;
									if ( results[i][j].date > dateYesterday ) {
										variationDay += 1;
									}
								}
							}
						}

					}

					
					var renderParams = {
						user: req.user,
						userTeam: userTeam,
						variation: variation,
						variationDay: variationDay,
						variationWeek: variationWeek,
						error: error
					};
					res.render( 'pages/template-page-team-dashboard.ejs', renderParams );
				}
			);

		}

	});
};