exports.post = function(req, res) {
	var Team = require('../../model/team');
	var newTeam = new Team();
	if (newTeam.add(req.param('name'), req.user)) {
		res.redirect('/monequipe');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};