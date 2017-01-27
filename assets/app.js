var appBuyPlayerList = new Vue( {
	el: '#buy-player-list',
	
	data: {
		buyPlayerList: [ ],
		position: appBuyPlayerListPosition,
		club: ''
	},

	mounted: function () {
		this.refresh();
	},
	
	methods: {
		refresh: function () {
			this.buyPlayerList = new Array();
			
			this.$http.get('/monequipe/filtrer-joueurs-achat?position=' + this.position + '&club=' + this.club).then( function ( jsonResults ) {
				this.buyPlayerList = JSON.parse( jsonResults.data );
			});
			
		}
	}
	
} );