exports.execute = function(req, res){
	res.render('pages/signin.ejs', { user : req.user, message: req.flash('loginMessage') });
};