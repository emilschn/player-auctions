exports.prepare = function(req, res) {
	const entityPlayer = require( '../../model/player' );
	const entityTeam = require( '../../model/team' );
	
	entityTeam.findById( req.user.team, function (err, userTeam){
	
		var searchParams = {};
		if ( req.query.position !== "" && req.query.position !== null ) { searchParams.position = req.query.position; }
		if ( req.query.club !== "" && req.query.club !== null ) { searchParams.club = req.query.club; }
		
		if ( !err ) {
			var playerIdList = userTeam.players.map(function(player) { return player.id; } );
			searchParams._id = { '$nin': playerIdList };
		}

		entityPlayer.find( searchParams, function( err, playerList ) {
			var buffer = "";
			if ( err ) {
				console.log("player-list error");
				buffer = "error"; 
			} else {
				var toJSON = new Array();
				var nPlayers = playerList.length;
				for ( var i = 0; i < nPlayers; i++ ) {
					var newPlayer = {
						_id: playerList[i]._id,
						firstname: playerList[i].firstname,
						lastname: playerList[i].lastname,
						club: playerList[i].club,
						position: playerList[i].position,
						buyingValue: playerList[i].getBuyingValue()
					};
					toJSON.push( newPlayer );
				}
				buffer = JSON.stringify( toJSON );
			}
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end( buffer );
		});
		
	});
	
};