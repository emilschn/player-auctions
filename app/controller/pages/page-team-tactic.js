/**
 * PAGE - ACCOUNT/TEAM/PLAYERS
 */

/**
 * Displays players from the team and buyable players
 */
exports.prepare = function(req, res){
	var error = req.query.error;

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

			res.render('pages/template-page-team-tactic.ejs', { user : req.user, error: error, 
				positionList: positionList,
				clubList: clubList });

		});
		
	});
};