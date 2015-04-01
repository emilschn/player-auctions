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

	app.get('/moncompte', isLoggedIn, function(req, res) {
		res.render('pages/account.ejs', {user : req.user});

	}).use(function(req, res, next){
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