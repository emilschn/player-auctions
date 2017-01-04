exports.execute = function(req, res, async) {
	async.parallel([
		function(callback) {
			var Country = require('../model/country');
			Country.find(function(err, countryList) {
				if (err) {
					callback(err);
				} else {
					callback(null, countryList);
				}
			});
		},
		function(callback) {
			var Division = require('../model/division');
			Division.find(function(err, divisionList) {
				if (err) {
					callback(err);
				} else {
					callback(null, divisionList);
				}
			});
		},
		function(callback) {
			var Club = require('../model/club');
			Club.find(function(err, clubList) {
				if (err) {
					callback(err);
				} else {
					callback(null, clubList);
				}
			});
		},
		function(callback) {
			var Position = require('../model/position');
			Position.find(function(err, positionList) {
				if (err) {
					callback(err);
				} else {
					callback(null, positionList);
				}
			});
		},
		function(callback) {
			var Player = require('../model/player');
			Player.find(function(err, playerList) {
				if (err) {
					callback(err);
				} else {
					callback(null, playerList);
				}
			});
		}
	],
	function(err, results) {
		if (err) {
			console.log(err);
			return res.send(400);
		}
		if (results == null || results[0] == null) {
			console.log("400");
			return res.send(400);
		}

		res.render('admin/add.ejs', {
			user: req.user, 
			countryList: results[0], 
			divisionList: results[1], 
			clubList: results[2], 
			positionList: results[3], 
			playerList: results[4]
		});
	});
};

exports.postCountry = function(req, res) {
	var Country = require('../model/country');
	var newCountry = new Country();
	if (newCountry.add(req.param('name')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Champ nom vide !');
	}
};

exports.postDivision = function(req, res) {
	var Division = require('../model/division');
	var newDivision = new Division();
	if (newDivision.add(req.param('name'), req.param('country')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};

exports.postClub = function(req, res) {
	var Club = require('../model/club');
	var newClub = new Club();
	if (newClub.add(req.param('name'), req.param('division')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};

exports.postPosition = function(req, res) {
	var Position = require('../model/position');
	var newPosition = new Position();
	if (newPosition.add(req.param('name')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};

exports.postPlayer = function(req, res) {
	var Player = require('../model/player');
	var newPlayer = new Player();
	if (newPlayer.add(req.param('firstname'), req.param('lastname'), req.param('country'), req.param('position'), req.param('club')) !== 0) {
		res.redirect('/admin/ajouter');
	} else {
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Il y a au moins un champ vide !');
	}
};