



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

	game.renderer.update();
	game.player.look();
	window.requestAnimationFrame(update);
}

