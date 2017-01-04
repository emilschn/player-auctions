exports.execute = function(req, res){
	var Team = require('../model/team');
	Team.findOne({'_id': req.user.team}, function(err, userTeam) {
		res.render('pages/team.ejs', {user : req.user, userTeam: userTeam});
	});
};
exports.post = function(req, res) {
	var Team = require('../model/team');
	var newTeam = new Team();
	if (newTeam.add(req.param('name'), req.user) !== 0) {
		res.redirect('/monequipe');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
}