exports.execute = function(req, res){
	req.logout();
	res.redirect('/');
};