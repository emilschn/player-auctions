/**
 * PAGE - ACCOUNT/TEAM/PLAYERS
 */

/**
 * Displays players from the team and buyable players
 */
exports.prepare = function(req, res){
	var error = req.query.error;

	var Club = require('../../model/club');
	Club.find({}, function(err, clubList) {

		var clubsById = new Array();
		var countClubs = clubList.length;
		for ( i = 0; i < countClubs; i++ ) {
			clubsById[ clubList[i]._id ] = clubList[i].name;
		}
	
		var Position = require('../../model/position');
		Position.find({}, function(err, positionList) {

			var positionsById = new Array();
			var countPositions = positionList.length;
			for ( i = 0; i < countPositions; i++ ) {
				positionsById[ positionList[i]._id ] = positionList[i].name;
			}

			res.render('pages/template-page-team-players.ejs', { user : req.user, error: error, 
				positionList: positionList,
				clubList: clubList });

		});
		
	});
};




				/*
				<table id="team-list" class="display" width="100%"></table>
				<script type="text/javascript">
					var dataSet = [
						<% playerList.forEach(function(player){ %>
							[	'<%= player.firstname %>',
								'<%= player.lastname %>',
								'<%= player.position %>',
								'<%= player.club %>',
								'<%= player.initValue %>€',
								'<%= player.currentValue %>€',
								'<span style="color: <% if ( player.valueDifference > 0 ){ %>green<% } else { %>red<% } %>"><%= player.valueDifference %>€</span>',
								'<form action="/mon-equipe/vendrejoueur" method="POST">\
								<input type="hidden" name="playerId" value="<%= player.id %>" />\
								<button class="btn" type="submit">Vendre pour <%= player.sellingValue %>€</button>\
								</form>'
							],
						<% }) %>
					];
					$(document).ready(function() {
						$('#team-list').DataTable( {
							data: dataSet,
							columns: [
								{ title: "Prénom" },
								{ title: "Nom" },
								{ title: "Position" },
								{ title: "Club" },
								{ title: "Valeur d'achat" },
								{ title: "Valeur actuelle" },
								{ title: "Variation" },
								{ title: "Action" },
							]
						} );
					} );
				</script>
				*/