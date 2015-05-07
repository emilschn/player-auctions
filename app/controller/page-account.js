exports.execute = function(req, res){
    res.render('pages/account.ejs', {user : req.user});
};