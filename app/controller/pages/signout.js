exports.prepare = function(req, res){
	req.logout();
	res.redirect('/');
};