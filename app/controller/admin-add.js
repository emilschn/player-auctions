exports.execute = function(req, res){
	//Async getting datas from country, divisions, clubs, positions, players
	var Country = require('../model/country');
	Country.find(function(err, countryList) {

	var Division = require('../model/division');
	Division.find(function(err, divisionList) {

	var Club = require('../model/club');
	Club.find(function(err, clubList) {

	var Position = require('../model/position');
	Position.find(function(err, positionList) {

	var Player = require('../model/player');
	Player.find(function(err, playerList) {
		res.render('admin/add.ejs', {user: req.user, countryList: countryList, divisionList: divisionList, clubList: clubList, positionList: positionList, playerList: playerList});
	}); }); }); }); });
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