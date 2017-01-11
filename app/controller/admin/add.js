exports.prepare = function(req, res, async) {
	async.parallel([
		function(callback) {
			var Country = require('../../model/country');
			Country.find(function(err, countryList) {
				if (err) {
					callback(err);
				} else {
					callback(null, countryList);
				}
			});
		},
		function(callback) {
			var Division = require('../../model/division');
			Division.find(function(err, divisionList) {
				if (err) {
					callback(err);
				} else {
					callback(null, divisionList);
				}
			});
		},
		function(callback) {
			var Club = require('../../model/club');
			Club.find(function(err, clubList) {
				if (err) {
					callback(err);
				} else {
					callback(null, clubList);
				}
			});
		},
		function(callback) {
			var Position = require('../../model/position');
			Position.find(function(err, positionList) {
				if (err) {
					callback(err);
				} else {
					callback(null, positionList);
				}
			});
		},
		function(callback) {
			var Player = require('../../model/player');
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