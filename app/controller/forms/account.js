exports.post = function( req, res, conf ) {
	
	// Password change
	// Checks current password
	if ( req.user.validPassword( req.body.passwordcurrent ) ) {
		
		if ( req.body.passwordnew === req.body.passwordrepeat ) {
			
			req.user.local.password = req.user.generateHash( req.body.passwordnew );
			req.user.save();
			
			var emailjs = require('./../../../node_modules/emailjs/email');
			var server 	= emailjs.server.connect({
			   user:    conf.email.user,
			   password:conf.email.password,
			   host:    conf.email.host,
			   port:	conf.email.port,
			   ssl:     true
			});

			// send the message and get a callback with an error or details of the message that was sent 
			server.send({
			   from:    conf.email.from, 
			   to:      conf.email.to,
			   subject: "Test de mail",
			   text:    "Mon super texte" 
			}, function(err, message) { console.log(err || message); });
			
			res.redirect('/moncompte?success=password');
			
		} else {
			
			res.redirect('/moncompte?error=password');
			
		}
		
	} else {
			
		res.redirect('/moncompte?error=password');

	}
	
};