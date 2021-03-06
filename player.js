

var PLAYERTILE = 389;

function Player() {

	GameObject.call(this,"player");
	this.gold = 0;
	this.fov = new Field(isValid,isTransparent);
	this.fov.setRadius(5);	
}

Player.prototype.look = function() {

	this.fov.setCenter(this.col,this.row)
	this.fov.cast();

	for (i = 0; i < this.fov.points.length;i++) {
		game.map.setExplored(this.fov.points[i].y,this.fov.points[i].x);
	}
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
				game.messages.sendMessage("PLAYER",0,o.getMessage("onpickup"));
				game.map.removeObject(this.row,this.col);
			}
			else {
				// TODO: put in inventory.
			}
		}
	}
}