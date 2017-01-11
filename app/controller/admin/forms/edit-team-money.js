exports.post = function(req, res) {
	var Team = require('../../../model/team');
	Team.findOne({_id: req.param('teamId')}, function(err, team){
		team.money = req.param('value');
		team.save();
		res.redirect('/admin/editer');
	});
};