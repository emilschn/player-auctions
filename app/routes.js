module.exports = function(app, passport) {
    
	//HOME
	app.get('/', function(req, res) {
		res.render('pages/home.ejs', {user : req.user});
	});

//****************************************
//LOGIN MANAGEMENT
	//SIGNIN
	app.get('/connexion', function(req, res) {
		res.render('pages/signin.ejs', { user : req.user, message: req.flash('loginMessage') });
	});
	app.post('/connexion', passport.authenticate('local-login', {
		successRedirect : '/moncompte', // redirect to the secure profile section
		failureRedirect : '/connexion', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages

	}));
	
	//SIGNUP
	app.get('/inscription', function(req, res) {
		res.render('pages/signup.ejs', { user : req.user, message: req.flash('signupMessage') });
	});
	app.post('/inscription', passport.authenticate('local-signup', {
		successRedirect : '/moncompte', // redirect to the secure profile section
		failureRedirect : '/inscription', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	//LOGOUT
	app.get('/deconnexion', function(req, res) {
		req.logout();
		res.redirect('/');
	});
//FIN LOGIN MANAGEMENT
//****************************************


//****************************************
//BACK-OFFICE
	app.get('/admin/ajouter', isLoggedIn, function(req, res) {
		//Récupération asynchrone de la liste des pays, des divisions, des clubs, des positions et des joueurs
		var Country = require('./model/country');
		Country.find(function(err, countryList) {
		    
		var Division = require('./model/division');
		Division.find(function(err, divisionList) {
		    
		var Club = require('./model/club');
		Club.find(function(err, clubList) {
		    
		var Position = require('./model/position');
		Position.find(function(err, positionList) {
		    
		var Player = require('./model/player');
		Player.find(function(err, playerList) {
			res.render('admin/add.ejs', {user: req.user, countryList: countryList, divisionList: divisionList, clubList: clubList, positionList: positionList, playerList: playerList});
		}); }); }); }); });
	});
	app.post('/admin/ajouter/pays', function(req, res) {
		var Country = require('./model/country');
		var newCountry = new Country();
		if (newCountry.add(req.param('name')) !== 0) {
			res.redirect('/admin/ajouter');
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Champ nom vide !');
		}
	});
	app.post('/admin/ajouter/division', function(req, res) {
		var Division = require('./model/division');
		var newDivision = new Division();
		if (newDivision.add(req.param('name'), req.param('country')) !== 0) {
			res.redirect('/admin/ajouter');
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Il y a au moins un champ vide !');
		}
	});
	app.post('/admin/ajouter/club', function(req, res) {
		var Club = require('./model/club');
		var newClub = new Club();
		if (newClub.add(req.param('name'), req.param('division')) !== 0) {
			res.redirect('/admin/ajouter');
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Il y a au moins un champ vide !');
		}
	});
	app.post('/admin/ajouter/position', function(req, res) {
		var Position = require('./model/position');
		var newPosition = new Position();
		if (newPosition.add(req.param('name')) !== 0) {
			res.redirect('/admin/ajouter');
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Il y a au moins un champ vide !');
		}
	});
	app.post('/admin/ajouter/joueur', function(req, res) {
		var Player = require('./model/player');
		var newPlayer = new Player();
		if (newPlayer.add(req.param('firstname'), req.param('lastname'), req.param('country'), req.param('position'), req.param('club')) !== 0) {
			res.redirect('/admin/ajouter');
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Il y a au moins un champ vide !');
		}
	});
//FIN BACK-OFFICE
//****************************************

//****************************************
//COMPTE UTILISATEUR
	app.post('/monequipe/creer', function(req, res) {
		var Team = require('./model/team');
		var newTeam = new Team();
		if (newTeam.add(req.param('name'), req.user) !== 0) {
			res.redirect('/monequipe');
		} else {
			res.setHeader('Content-Type', 'text/plain');
			res.send(404, 'Il y a au moins un champ vide !');
		}
	});

	app.get('/moncompte', isLoggedIn, function(req, res) {
		res.render('pages/account.ejs', {user : req.user});

	}).get('/monequipe', isLoggedIn, function(req, res) {
		var Team = require('./model/team');
		Team.findOne({'_id': req.user.team}, function(err, userTeam) {
			res.render('pages/team.ejs', {user : req.user, userTeam: userTeam});
		});

	}).use(function(req, res, next){
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Page introuvable !');

	});
//FIN COMPTE UTILISATEUR
//****************************************
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}