exports.prepare = function(req, res){
    res.render( 'pages/template-page-account-parameters.ejs', { user: req.user, success: req.query.success, error: req.query.error } );
};