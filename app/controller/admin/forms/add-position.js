exports.post = function(req, res) {
	var Position = require('../../../model/position');
	var newPosition = new Position();
	if (newPosition.add(req.param('name')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};