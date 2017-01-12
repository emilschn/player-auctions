exports.prepare = function( req, res, async ) {
	const entityTeam = require( '../../model/team' );
	const entityPosition = require( '../../model/position' );
	const entityPlayer = require( '../../model/player' );
	const entityClub = require( '../../model/club' );
	
	// Functions that need to get launched before
	var prepareFunctionsList = [];
	// Gets the team of the current user
	prepareFunctionsList.push(
		function( callback ) {
			entityTeam.findOne( { '_id': req.user.team }, function( err, userTeam ) {
				if ( err ) { return callback( err ); }
				return callback( null, userTeam );
			});
		}
	);
	// Gets the player list corresponding to the position
	prepareFunctionsList.push(
		function( callback ) {
			entityTeam.findById( req.user.team, function (err, userTeam){
				if ( err ) { return callback( err ); }
				entityPosition.findOne( { 'name': req.params.position }, function( err, position ) {
					if ( err ) { return callback( err ); } 
					if ( position === null ) { return callback( null, null ); }

					var playerIdList = userTeam.players.map(function(player) { return player.id; } );
					entityPlayer.find( { 'position': position._id, '_id': { '$nin': playerIdList } }, function( err, playerList ) {
						if ( err ) { return callback( err ); }
						return callback( null, playerList );
					});
				});
			});
		}
	);
	// Gets the positions list
	prepareFunctionsList.push(
		function( callback ) {
			entityPosition.find( {}, function( err, positionList ) {
				if ( err ) { return callback( err ); }
				return callback( null, positionList );
			} );
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
			
			var userTeam = "";
			if ( results[0] === null ) { error = "team-not-found"; }
			else { userTeam = results[0]; }
			
			var playerList = "";
			if ( results[1] === null ) { return res.sendStatus(404); }
			else { playerList = results[1]; }
			
			var positionList = "";
			if ( results[2] === null ) { error = "internal-error"; }
			else { positionList = results[2]; }
			
			var clubList = "";
			if ( results[3] === null ) { error = "internal-error"; }
			else { clubList = results[3]; }
			
			// Security : test playerList and teamPlayerList to remove the players which have already been bought
			// TODO
			
			var renderParams = {
				error: error,
				user: req.user,
				userTeam: userTeam,
				position: req.params.position,
				playerList: playerList,
				positionList: positionList,
				clubList: clubList
			};
			res.render('pages/buy.ejs', renderParams);
		}
	);
	
};