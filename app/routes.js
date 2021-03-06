module.exports = function( app, passport, async, conf ) {

//****************************************
//LOGIN MANAGEMENT
	//SIGNIN
	app.get('/connexion', function(req, res) { require('./controller/pages/signin.js').prepare(req, res); });
	app.post('/connexion', passport.authenticate('local-login', {
		successRedirect : '/mon-equipe', // redirect to the secure profile section
		failureRedirect : '/connexion', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	//SIGNUP
	app.get('/inscription', function(req, res) { require('./controller/pages/signup.js').prepare(req, res); });
	app.post('/inscription', passport.authenticate('local-signup', {
		successRedirect : '/mon-equipe', // redirect to the secure profile section
		failureRedirect : '/inscription', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	//LOGOUT
	app.get('/deconnexion', function(req, res) { require('./controller/pages/signout.js').prepare(req, res); });
//FIN LOGIN MANAGEMENT
//****************************************


//****************************************
//BACK-OFFICE
	app.get('/admin/ajouter', isLoggedIn, function(req, res) { require('./controller/admin/add.js').prepare(req, res, async); });
	app.post('/admin/ajouter/pays', isLoggedIn, function(req, res) { require('./controller/admin/forms/add-country.js').post(req, res); });
	app.post('/admin/ajouter/division', isLoggedIn, function(req, res) { require('./controller/admin/forms/add-division.js').post(req, res); });
	app.post('/admin/ajouter/club', isLoggedIn, function(req, res) { require('./controller/admin/forms/add-club.js').post(req, res); });
	app.post('/admin/ajouter/position', isLoggedIn, function(req, res) { require('./controller/admin/forms/add-position.js').post(req, res); });
	app.post('/admin/ajouter/joueur', isLoggedIn, function(req, res) { require('./controller/admin/forms/add-player.js').post(req, res); });
	
	app.get('/admin/editer', isLoggedIn, function(req, res) { require('./controller/admin/edit.js').prepare(req, res, async); });
	app.post('/admin/editer/equipe', isLoggedIn, function(req, res) { require('./controller/admin/forms/edit-team.js').post(req, res); });
	app.post('/admin/editer/equipemonnaie', isLoggedIn, function(req, res) { require('./controller/admin/forms/edit-team-money.js').post(req, res); });
	app.post('/admin/editer/historique', isLoggedIn, function(req, res) { require('./controller/admin/forms/edit-history.js').post(req, res); });
	app.post('/admin/editer/joueur', isLoggedIn, function(req, res) { require('./controller/admin/forms/edit-player.js').post(req, res); });
//END BACK-OFFICE
//****************************************

//****************************************
//USER ACCOUNT
	app.get('/mon-compte', isLoggedIn, function(req, res) { require('./controller/pages/account.js').prepare(req, res); });
	app.post('/mon-compte', isLoggedIn, function(req, res) { require('./controller/forms/account.js').post(req, res, conf); });
	
	app.get('/mon-equipe', isLoggedIn, function(req, res) { require('./controller/pages/page-team-dashboard.js').prepare(req, res, async); });
	app.get('/mes-joueurs', isLoggedIn, function(req, res) { require('./controller/pages/page-team-players.js').prepare(req, res, async); });

	app.get('/mon-equipe/acheter/:position', isLoggedIn, function(req, res) { require('./controller/pages/buy.js').prepare(req, res, async); });
	
	app.post('/mon-equipe/creer', isLoggedIn, function(req, res) { require('./controller/forms/create-team.js').post(req, res); });
	app.post('/mon-equipe/vendrejoueur', isLoggedIn, function(req, res) { require('./controller/forms/sell-player.js').post(req, res); });
	app.post('/mon-equipe/acheterjoueur', isLoggedIn, function(req, res) { require('./controller/forms/buy-player.js').post(req, res, async); });
	
	// Ajax
	app.get('/mon-equipe/joueurs', isLoggedIn, function(req, res) { require('./controller/ajax/ajax-team-players-list.js').prepare(req, res); });
	app.get('/mon-equipe/filtrer-joueurs-achat', isLoggedIn, function(req, res) { require('./controller/ajax/player-list.js').prepare(req, res); });
//END USER ACCOUNT
//****************************************
	
	//DEFAULT
	app.get('/mentions-legales', function(req, res) { require('./controller/pages/legal.js').execute(req, res); });
	app.get('/', function(req, res) { require('./controller/pages/home.js').execute(req, res); });
	app.use(function(req, res, next){
		res.setHeader('Content-Type', 'text/html');
		res.status(404).send('Page introuvable !<br /><a href="/">Accueil</a>');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}