exports.prepare = function(req, res){
    res.render( 'pages/account.ejs', { user: req.user, success: req.query.success, error: req.query.error } );
};