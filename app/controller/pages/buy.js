exports.prepare = function(req, res, async){
	//Requetes en amont du chargement de la page
	async.parallel(
		[
			//Récupérer l'équipe de l'utilisateur connecté
			function(callback) {
				var Team = require('../../model/team');
				Team.findOne({'_id': req.user.team}, function(err, userTeam) {
					if (err) {
						callback(err);
					} else {
						callback(null, userTeam);
					}
				});
			},
			//Récupérer la liste des joueurs correspondant à la position
			function(callback) {
				var Position = require('../../model/position');
				Position.findOne({'name': req.params.position}, function(err, position) {
					if (err) {
						callback(err);
					} else {
						if (position === null) {
							callback(null, null);
						} else {
							var Player = require('../../model/player');
							Player.find({'position': position._id}, function(err, playerList) {
								if (err) {
									callback(err);
								} else {
									callback(null, playerList);
								}
							});
						}
					}
				});
			}
		],
		function(err, results) {
			if (err) {
				console.log("page-buy : " + err);
				return res.sendStatus(400);
			}
			if (results == null || results[0] == null) {
				console.log("page-buy : 400");
				return res.sendStatus(400);
			}
			if (results[1] == null) {
				console.log("page-buy : 404");
				return res.sendStatus(404);
			}
			
			//TODO : comparer joueurs de l'équipe et liste des joueurs pour supprimer ceux qui y sont déjà
			res.render('pages/buy.ejs', {
				user: req.user,
				userTeam: results[0],
				position: req.params.position,
				playerList: results[1]
			});
		}
	);
	
};