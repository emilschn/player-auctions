exports.post = function(req, res) {
	var Country = require('../../../model/country');
	var newCountry = new Country();
	if (newCountry.add(req.param('name')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Champ nom vide !');
	}
};