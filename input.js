

function doKeyDown(e) {

	switch(e.keyCode) {

		// t
		case 84:
			game.flags["showTile"] = !game.flags["showTile"];
			console.log("[Debug] showTile is " + game.flags["showTile"].toString() + ".");
			break;


		case 37:
			if (game.flags["showTile"]) {
				game.debug.tileIndex--;
				if (game.debug.tileIndex < 0 ) {
					game.debug.tileIndex = game.renderer.tiles.maxIndex - 1;
				}
				console.log("[Debug] tileIndex is " + game.debug.tileIndex.toString() + ".");
			}
			else {
				game.player.move(0,-1);
			}
			
			break;

		case 39:
			if (game.flags["showTile"]) {
				game.debug.tileIndex++;
				if (game.debug.tileIndex >= game.renderer.tiles.maxIndex) {
					game.debug.tileIndex = 0;
				}
				console.log("[Debug] tileIndex is " + game.debug.tileIndex.toString() + ".");
			}
			else {
				
				game.player.move(0,1);
			}
			
			
			break;

		case 38:
			if (game.flags["showTile"]) {
				game.debug.tileIndex -= game.renderer.tiles.tilesPerLine;
				if (game.debug.tileIndex < 0 ) {
					game.debug.tileIndex = game.renderer.tiles.maxIndex - 1;
				}
				console.log("[Debug] tileIndex is " + game.debug.tileIndex.toString() + ".");
			}
			else {
				
				game.player.move(-1,0);
			}
			break;

		case 40:
			if (game.flags["showTile"]) {
				game.debug.tileIndex += game.renderer.tiles.tilesPerLine;
				if (game.debug.tileIndex >= game.renderer.tiles.maxIndex) {
					game.debug.tileIndex = 0;
				}
				console.log("[Debug] tileIndex is " + game.debug.tileIndex.toString() + ".");
			}
			else {
				
				game.player.move(1,0);
			}
			break;

	}
	
}