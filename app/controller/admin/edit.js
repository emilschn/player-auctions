exports.prepare = function(req, res, async) {
	async.parallel([
		function(callback) {
			var Team = require('../../model/team');
			Team.find(function(err, teamList) {
				if (err) {
					callback(err);
				} else {
					callback(null, teamList);
				}
			});
		},
		function(callback) {
			var History = require('../../model/history');
			History.find(function(err, historyList) {
				if (err) {
					callback(err);
				} else {
					callback(null, historyList);
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

		res.render('admin/edit.ejs', {
			user: req.user, 
			teamList: results[0], 
			historyList: results[1], 
			playerList: results[2]
		});
	});
};