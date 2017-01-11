exports.post = function(req, res) {
	var Player = require('../../../model/player');
	Player.findOne({_id: req.param('playerId')}, function(err, player){
		player.currentValue = req.param('value');
		player.save();
		res.redirect('/admin/editer');
	});
};