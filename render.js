
var ROWS = 10
var COLS = 20
var TILESIZE = 64
var FONTSIZE = 24


function Renderer() {

	this.canvas = document.getElementById("game");
	this.ctx = this.canvas.getContext('2d');	
	this.tiles = new TileSet('Shockbolt_64x64_01.png',TILESIZE,TILESIZE);
	document.addEventListener( 'keydown', doKeyDown, false);
	
	this.viewList = {
		"character" : new View(this.ctx,0,0,80,this.canvas.height-40,charViewUpdate),
		"messages"  : new View(this.ctx,0,this.canvas.height-40,this.canvas.width,40,messagesViewUpdate),
		"game"		: new View(this.ctx,80,0,this.canvas.width-80,this.canvas.height-40,gameViewUpdate),
	}
}

Renderer.prototype.update = function() {
	for (key in this.viewList) {
		this.viewList[key].update();
	}
}

Renderer.prototype.clear = function() {
	this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}

Renderer.prototype.sendMessage = function(string) {
	//this.messages.innerHTML += (string + '<br>');
}

Renderer.prototype.drawTile = function(view,index,x,y) {

	var t = this.tiles;
	var sx = 0;
	var sy = 0;
	var dx = x*t.tileWidth	+ view.x; 
	var dy = y*t.tileHeight + view.y;

	if (index < t.maxIndex ) {
		sy = parseInt(index/t.tilesPerLine);
		sx = parseInt(index%t.tilesPerLine);	
	}

	
	this.ctx.drawImage(t.img,sx*t.tileWidth,sy*t.tileHeight,t.tileWidth,t.tileHeight,dx,dy,t.tileWidth,t.tileHeight);
}

function View(ctx,x,y,w,h,update) {

	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.ctx = ctx;
	this.update = update;

}

View.prototype.clear = function() {
	this.ctx.fillRect(this.x,this.y,this.width,this.height);
}


function charViewUpdate() {

}

function gameViewUpdate() {

	this.clear();

	var o;
	for (i = 0; i < ROWS; i++) {
		for (j = 0;j < COLS; j++) {

			if (!game.map.explored(i,j)) {
				continue;
			}

			o = game.map.getBase(i,j);
			game.renderer.drawTile(this,o.tile,j,i);

			if (game.map.hasObject(i,j)) {
				o = game.map.getObject(i,j);
				game.renderer.drawTile(this,o.tile,j,i);
			}

			if (game.map.hasCreature(i,j)) {
				o = game.map.getCreature(i,j);
				game.renderer.drawTile(this,o.tile,j,i);
			}
		}
	}

	if (game.flags["showTile"]) {
		game.renderer.drawTile(game.debug.tileIndex,0,0);		
	}
}

function messagesViewUpdate() {

}








