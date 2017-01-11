exports.post = function(req, res) {
	var Player = require('../../../model/player');
	var newPlayer = new Player();
	if (newPlayer.add(req.param('firstname'), req.param('lastname'), req.param('country'), req.param('position'), req.param('club')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};