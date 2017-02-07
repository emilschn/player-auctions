var appBuyPlayerList = new Vue( {
	el: '#team-players-list',
	
	data: {
		isLoadingTeamPlayerList: false,
		teamPlayerList: [ ],
		isLoadingBuyPlayerList: false,
		buyPlayerList: [ ],
		position: appBuyPlayerListPosition,
		club: ''
	},

	mounted: function () {
		this.refreshTeamPlayerList();
		this.refreshBuyPlayerList();
	},
	
	methods: {
		refreshTeamPlayerList: function () {
			this.isLoadingTeamPlayerList = true;
			this.teamPlayerList = new Array();
			
			this.$http.get('/mon-equipe/joueurs').then( function ( jsonResults ) {
				this.isLoadingTeamPlayerList = false;
				this.teamPlayerList = JSON.parse( jsonResults.data );
			} );
		},

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