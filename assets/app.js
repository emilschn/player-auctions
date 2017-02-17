var appBuyPlayerList = new Vue( {
	el: '#team-players-list',
	
	data: {
		isLoadingBuyPlayerList: true,
		buyPlayerList: [ ],
		position: appBuyPlayerListPosition,
		club: ''
	},

	mounted: function () {
		this.refreshBuyPlayerList();
	},
	
	methods: {
		refreshBuyPlayerList: function () {
			this.isLoadingBuyPlayerList = true;
			this.buyPlayerList = new Array();
			
			this.$http.get('/mon-equipe/filtrer-joueurs-achat?position=' + this.position + '&club=' + this.club).then( function ( jsonResults ) {
				this.isLoadingBuyPlayerList = false;
				this.buyPlayerList = JSON.parse( jsonResults.data );
			} );
		}
	}
	
} );