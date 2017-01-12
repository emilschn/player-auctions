function updateBuyList() {
	$.ajax(
			
		{
			type: "GET",
			url: "/monequipe/filtrer-joueurs-achat",
			data: {
				position: $('#filter-position').val(),
				club: $('#filter-club').val()
			}
		}
	
	).done(
	
		function ( json ) {
			
			var aResult = JSON.parse(json);
			var nResult = aResult.length;
			
			$( "#form-buy-player-list" ).empty();
			if (nResult == 0) {
				$( "#form-buy-player-list" ).html("Aucun résultat !");
				
			} else {
				
				for (var i = 0; i < nResult; i++) {

					var newElement = '\
					<form action="/monequipe/acheterjoueur" method="POST">\
						<dl class="form">\
							<dt><label for="player">' +aResult[i].firstname+ ' ' +aResult[i].lastname+ ' à ' +aResult[i].buyingValue+ '€</label></dt>\
							<dd>\
								<input type="hidden" name="player" value="' +aResult[i]._id+ '" />\
								<button class="btn btn-primary" type="submit">Acheter</button>\
							</dd>\
						</dl>\
					</form>';
					$( "#form-buy-player-list" ).append( newElement );
			
				}
				
			}
		
		}
		
	);
}

$( document ).ready(function() {
 
    if ( $('#filter-position').length > 0 ) {
		$('#filter-position').change(function() {
			updateBuyList();
		});
		$('#filter-club').change(function() {
			updateBuyList();
		});
	}
 
});