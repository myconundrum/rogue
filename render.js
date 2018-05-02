
var ROWS = 10
var COLS = 13
var TILESIZE = 64


function Renderer() {

	this.canvas = document.createElement('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.ctx.fillStyle = "black"
	this.canvas.id = "GameLayer";
	this.canvas.width = COLS * TILESIZE;
	this.canvas.height = ROWS * TILESIZE;
	this.canvas.style.zIndex = 8;
	this.canvas.style.position = "absolute";
	this.canvas.style.border = "1px solid";

	document.addEventListener( 'keydown', doKeyDown, false);
	
	var g = document.getElementById("game");

	g.appendChild(this.canvas);
	
	this.messages=document.getElementById("msg");
	this.tiles = new TileSet('Shockbolt_64x64_01.png',TILESIZE,TILESIZE);


}

Renderer.prototype.clear = function() {
	this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}

Renderer.prototype.sendMessage = function(string) {
	this.messages.innerHTML += (string + '<br>');
}

Renderer.prototype.drawTile = function(index,x,y) {

	var sx = 0;
	var sy = 0;

	if (index < this.tiles.maxIndex ) {
		sy = parseInt(index/this.tiles.tilesPerLine);
		sx = parseInt(index%this.tiles.tilesPerLine);	
	}

	var t = this.tiles;
	this.ctx.drawImage(t.img,sx*t.tileWidth,sy*t.tileHeight,t.tileWidth,t.tileHeight,x,y,t.tileWidth,t.tileHeight);
}

