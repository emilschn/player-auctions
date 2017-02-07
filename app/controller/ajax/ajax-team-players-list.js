exports.prepare = function(req, res) {
	
	var Club = require('../../model/club');
	Club.find({}, function(err, clubList) {

		var clubsById = new Array();
		var countClubs = clubList.length;
		for ( i = 0; i < countClubs; i++ ) {
			clubsById[ clubList[i]._id ] = clubList[i].name;
		}
	
		var Position = require('../../model/position');
		Position.find({}, function(err, positionList) {

			var positionsById = new Array();
			var countPositions = positionList.length;
			for ( i = 0; i < countPositions; i++ ) {
				positionsById[ positionList[i]._id ] = positionList[i].name;
			}


			// Gets the team of the current player
			var Team = require('../../model/team');
			Team.findOne({'_id': req.user.team}, function(err, userTeam) {

				if (userTeam === null) {
					res.render('pages/team.ejs', { user : req.user, userTeam: {}, playerList: [], error: error });

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
							objectPlayer.position = positionsById[ dbPlayer.position ];
							objectPlayer.club = clubsById[ dbPlayer.club ];

							var countUserTeamPlayers = userTeam.players.length;
							for ( i = 0; i < countUserTeamPlayers; i++ ) {
								if ( userTeam.players[i].id.equals( dbPlayer._id ) ) {
									objectPlayer.initValue = userTeam.players[i].amount;
									objectPlayer.date = userTeam.players[i].date;
								}
							}
							
							objectPlayer.valueDifference = objectPlayer.currentValue - objectPlayer.initValue;
							
							return objectPlayer;
						});

						buffer = JSON.stringify( playerList );
						res.writeHead(200, {'Content-Type': 'text/plain'});
						res.end( buffer );

					});

				}

			});

		});
	});
};