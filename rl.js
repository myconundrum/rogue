



// global game variables stored here.
var game;

function init() {
	
	game = new GameState();
	window.requestAnimationFrame(update);
 	
 	game.playerIndex = 0;
 	game.map.addCreature(game.player,4,4);

 	createRoom();
 	createGold();
}


function createGold() {

	var r,c;
	var o;

	for (i = 0; i < 150; i++) {

		r = randInt(0,game.map.rows);
		c = randInt(0,game.map.cols);

		if (game.map.getBase(r,c).hasFlag("PASSABLE")) {
			o = new GameObject("gold");
			o.gold = randInt(1,20);
			game.map.addObject(o,r,c);
		}
	}
}

function createRoom() {

	for (r = 0; r < 5; r++) {
		for (c = 0; c < 5; c++) {
			if (r ==0 || r ==4 || c == 0 || c == 4) {
				game.map.setBase("wall",2+r,2+c);
			}
		}
	}
	game.map.setBase("grass",2,4);
}

function update () {

	game.renderer.clear();
	game.player.look();

	var o;
	for (i = 0; i < ROWS; i++) {
		for (j = 0;j < COLS; j++) {

			if (!game.map.explored(i,j)) {
				continue;
			}

			o = game.map.getBase(i,j);
			game.renderer.drawTile(o.tile,j*TILESIZE,i*TILESIZE);

			if (game.map.hasObject(i,j)) {
				o = game.map.getObject(i,j);
				game.renderer.drawTile(o.tile,j*TILESIZE,i*TILESIZE);
			}

			if (game.map.hasCreature(i,j)) {
				o = game.map.getCreature(i,j);
				game.renderer.drawTile(o.tile,j*TILESIZE,i*TILESIZE);
			}
		}
	}

	if (game.flags["showTile"]) {
		game.renderer.drawTile(game.debug.tileIndex,0,0);		
	}
	
	window.requestAnimationFrame(update);
}

