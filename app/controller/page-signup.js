exports.execute = function(req, res){
	res.render('pages/signup.ejs', { user : req.user, message: req.flash('signupMessage') });
};