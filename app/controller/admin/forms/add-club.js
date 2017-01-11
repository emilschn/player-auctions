exports.post = function(req, res) {
	var Club = require('../../../model/club');
	var newClub = new Club();
	if (newClub.add(req.param('name'), req.param('division')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};