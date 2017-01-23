exports.execute = function(req, res){
    res.render('pages/legal.ejs', {user : req.user});
};