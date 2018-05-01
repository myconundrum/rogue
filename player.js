

var PLAYERTILE = 389;

function Player() {

	GameObject.call(this,"player");
	this.gold = 0;
	
}


Player.prototype.move = function(dr,dc) {
	// try to move to new location.
	var nr = dr + this.row;
	var nc = dc + this.col;

	if (!game.map.validLoc(nr,nc) || !game.map.getBase(nr,nc).hasFlag('PASSABLE') || game.map.hasCreature(nr,nc)) {
		// can't move to this location.
		return;
	}

	game.map.moveCreature(game.playerIndex,nr,nc);

	if (game.map.hasObject(this.row,this.col)) {
		var o = game.map.getObject(this.row,this.col);
		if (o.hasFlag("CARRYABLE")) {
			if (o.hasFlag("TREASURE")) {
				this.gold += o.gold;
				game.renderer.sendMessage(o.getMessage("onpickup"));
				game.renderer.sendMessage("You have " + this.gold.toString() + " gold.");
				game.map.removeObject(this.row,this.col);
			}
			else {
				// TODO: put in inventory.
			}
		}
	}
}