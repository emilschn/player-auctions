module.exports = function(app, passport) {

//****************************************
//LOGIN MANAGEMENT
	//SIGNIN
	app.get('/connexion', function(req, res) { require('./controller/page-signin.js').execute(req, res); });
	app.post('/connexion', passport.authenticate('local-login', {
		successRedirect : '/moncompte', // redirect to the secure profile section
		failureRedirect : '/connexion', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	//SIGNUP
	app.get('/inscription', function(req, res) { require('./controller/page-signup.js').execute(req, res); });
	app.post('/inscription', passport.authenticate('local-signup', {
		successRedirect : '/moncompte', // redirect to the secure profile section
		failureRedirect : '/inscription', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	//LOGOUT
	app.get('/deconnexion', function(req, res) { require('./controller/page-signout.js').execute(req, res); });
//FIN LOGIN MANAGEMENT
//****************************************


//****************************************
//BACK-OFFICE
	app.get('/admin/ajouter', isLoggedIn, function(req, res) { require('./controller/admin-add.js').execute(req, res); });
	app.post('/admin/ajouter/pays', isLoggedIn, function(req, res) { require('./controller/admin-add.js').postCountry(req, res); });
	app.post('/admin/ajouter/division', isLoggedIn, function(req, res) { require('./controller/admin-add.js').postDivision(req, res); });
	app.post('/admin/ajouter/club', isLoggedIn, function(req, res) { require('./controller/admin-add.js').postClub(req, res); });
	app.post('/admin/ajouter/position', isLoggedIn, function(req, res) { require('./controller/admin-add.js').postPosition(req, res); });
	app.post('/admin/ajouter/joueur', isLoggedIn, function(req, res) { require('./controller/admin-add.js').postPlayer(req, res); });
//END BACK-OFFICE
//****************************************

//****************************************
//USER ACCOUNT
	app.get('/moncompte', isLoggedIn, function(req, res) { require('./controller/page-account.js').execute(req, res); });
	app.get('/monequipe', isLoggedIn, function(req, res) { require('./controller/page-team.js').execute(req, res); });
	app.post('/monequipe/creer', isLoggedIn, function(req, res) { require('./controller/page-team.js').post(req, res); });
//END USER ACCOUNT
//****************************************
	
	//DEFAULT
	app.get('/', function(req, res) { require('./controller/page-home.js').execute(req, res); });
	app.use(function(req, res, next){
		res.setHeader('Content-Type', 'text/plain');
		res.send(404, 'Page introuvable !');
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