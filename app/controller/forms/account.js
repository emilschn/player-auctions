exports.post = function(req, res) {
	
	// Password change
	// Checks current password
	if ( req.user.validPassword( req.body.passwordcurrent ) ) {
		
		if ( req.body.passwordnew === req.body.passwordrepeat ) {
			
			req.user.local.password = req.user.generateHash( req.body.passwordnew );
			req.user.save();
			res.redirect('/moncompte?success=password');
			
		} else {
			
			res.redirect('/moncompte?error=password');
			
		}
		
	} else {
			
		res.redirect('/moncompte?error=password');

	}
	
};