exports.execute = function(req, res){
    res.render('pages/home.ejs', {user : req.user});
};