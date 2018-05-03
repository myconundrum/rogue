

function GameState() {

	this.renderer 	= new Renderer();
	this.debug 		= new Debug();
	this.map 		= new GameMap();
	this.player 	= new Player();
	this.messages   = new GameMessages();


	this.flags = {};
	


}