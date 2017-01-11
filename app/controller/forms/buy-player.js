exports.post = function(req, res) {
	//TODO : comparer joueurs de l'équipe et joueur ajouté pour controler les doublons
	
	//Récupération du joueur ajouté
	var Player = require('../../model/player');
	Player.findOne({'_id': req.param('player')}, function(err, player) {
		if (player !== null) {
			
			//Commence par l'ajouter à l'historique des actions
			var History = require('../../model/history');
			var newHistory = new History();
			if (newHistory.add(req.user, player, 'buy')) {

				//Met à jour la liste des joueurs de l'équipe
				var Team = require('../../model/team');
				var updateTeam = new Team();
				updateTeam.addPlayer(req.user, player);

				//Redirige vers l'équipe
				res.redirect('/monequipe');
				
			}
			
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Il y a au moins un champ vide !');
		}
	});
}