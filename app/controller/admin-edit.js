exports.execute = function(req, res, async) {
	async.parallel([
		function(callback) {
			var Team = require('../model/team');
			Team.find(function(err, teamList) {
				if (err) {
					callback(err);
				} else {
					callback(null, teamList);
				}
			});
		},
		function(callback) {
			var History = require('../model/history');
			History.find(function(err, historyList) {
				if (err) {
					callback(err);
				} else {
					callback(null, historyList);
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

		res.render('admin/edit.ejs', {
			user: req.user, 
			teamList: results[0], 
			historyList: results[1], 
			playerList: results[2]
		});
	});
};

exports.postTeamMoney = function(req, res) {
	var Team = require('../model/team');
	Team.findOne({_id: req.param('teamId')}, function(err, team){
		team.money = req.param('value');
		team.save();
		res.redirect('/admin/editer');
	});
};

exports.postTeam = function(req, res) {
	var Team = require('../model/team');
	var updateTeam = new Team();
	updateTeam.removePlayer(req.param('teamId'), req.param('playerId'));
	res.redirect('/admin/editer');
};

exports.postHistory = function(req, res) {
	var History = require('../model/history');
	History.remove({ _id: req.param('historyId') }, function(err) {
		res.redirect('/admin/editer');
	});
};

exports.postPlayer = function(req, res) {
	var Player = require('../model/player');
	Player.findOne({_id: req.param('playerId')}, function(err, player){
		player.currentValue = req.param('value');
		player.save();
		res.redirect('/admin/editer');
	});
};