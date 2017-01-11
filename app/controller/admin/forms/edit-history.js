exports.post = function(req, res) {
	var History = require('../../../model/history');
	History.remove({ _id: req.param('historyId') }, function(err) {
		res.redirect('/admin/editer');
	});
};