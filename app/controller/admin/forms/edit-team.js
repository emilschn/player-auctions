exports.post = function(req, res) {
	var Team = require('../../../model/team');
	var updateTeam = new Team();
	updateTeam.removePlayer(req.param('teamId'), req.param('playerId'));
	res.redirect('/admin/editer');
};