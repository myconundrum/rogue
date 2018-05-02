

var NONE = -1

function Location() {

	this.baseId 		= "";     	// tile ID of the base for a location
	this.objectIndex 	= NONE;		// index into the object array
	this.creatureIndex 	= NONE;		// index into the creature array
	this.explored 		= false;
}


function GameMap() {

	this.rows = 40;
	this.cols = 40;

	this.baseTiles = {
		"grass":new GameObject("grass"),
		"wall": new GameObject("wall")
	};

	this.creatures = [];
	this.objects = [];

	
	this.data = new Array(this.rows);
	for (i = 0; i < this.rows; i++) {
		this.data[i] = new Array(this.cols);
		for (j = 0;j < this.cols; j++ ) {
			this.data[i][j] = new Location();
			this.data[i][j].baseId = "grass";
		}
	}

}

GameMap.prototype.validLoc = function(row,col) {
	return (row >= 0 && row < this.rows && col >= 0 && col < this.cols);
}


GameMap.prototype.getCreature = function(row,col) {

	var o = null;
	if (this.validLoc(row,col) && this.hasCreature(row,col)) {
		o = this.creatures[this.data[row][col].creatureIndex];
	}

	return o;
}

GameMap.prototype.setExplored = function(row,col) {

	if (this.validLoc(row,col)) {
		this.data[row][col].explored = true;
	}
}


GameMap.prototype.explored = function(row,col) {
	return this.validLoc(row,col) && this.data[row][col].explored;
}


GameMap.prototype.hasCreature = function(row,col) {
	return this.validLoc(row,col) && this.data[row][col].creatureIndex != NONE;
}


GameMap.prototype.hasObject = function(row,col) {
	return this.validLoc(row,col) && this.data[row][col].objectIndex != NONE;
}

GameMap.prototype.getObject = function(row,col) {

	var o = null;
	if (this.validLoc(row,col) && this.hasObject(row,col)) {
		o = this.objects[this.data[row][col].objectIndex];
	}

	return o;
}

GameMap.prototype.removeObject=function(row,col) {

	if (this.validLoc(row,col) && this.hasObject(row,col)) {
		this.getObject(row,col).setFlag("DEAD");
		this.data[row][col].objectIndex = NONE;
	}

}

GameMap.prototype.getBase = function(row,col) {

	var o = null;
	if (this.validLoc(row,col)) {
		o = this.baseTiles[this.data[row][col].baseId];
	}

	return o;
}



GameMap.prototype.getLoc = function(row,col) {
	
	if (this.validLoc(row,col)) {
		return this.data[row][col];
	}
	else {
		console.log("invalid location specified.");
		return null;
	}
}

GameMap.prototype.setBase = function(id,row,col) {
	var loc = this.getLoc(row,col)
	loc.baseId = id;
}


GameMap.prototype.addObject = function(o,row,col) {

	if (!this.validLoc(row,col))  {
		return false;
	}

	var l = this.getLoc(row,col);
	if (l.objectIndex != NONE) {
		return false;
	}

	o.row = row;
	o.col = col;
	var index = this.objects.push(o) - 1;
	l.objectIndex = index;

	return true;
}


GameMap.prototype.moveCreature = function(index,row,col) {

	if (!this.validLoc(row,col))  {
		return false;
	}

	var l = this.getLoc(row,col);
	if (l.creatureIndex != NONE) {
		return false;
	}

	var old = this.getLoc(this.creatures[index].row,this.creatures[index].col);
	old.creatureIndex = NONE;
	l.creatureIndex = index;
	this.creatures[index].row = row;
	this.creatures[index].col = col;

	return true;
}


GameMap.prototype.addCreature = function(o,row,col) {

	if (!this.validLoc(row,col))  {
		return false;
	}

	var l = this.getLoc(row,col);
	if (l.creatureIndex != NONE) {
		return false;
	}

	o.row = row;
	o.col = col;
	var index = this.creatures.push(o) - 1;
	l.creatureIndex = index;

	return true;
}






