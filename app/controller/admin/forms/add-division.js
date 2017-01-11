exports.post = function(req, res) {
	var Division = require('../../../model/division');
	var newDivision = new Division();
	if (newDivision.add(req.param('name'), req.param('country')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};