

var TILESIZE 		= 64
var FONTSIZE 		= 16
var FONT 			= "16px Courier"
var CHARVIEWWIDTH	= 300
var MSGVIEWHEIGHT	= 120




function Renderer() {

	this.canvas = document.getElementById("game");
	this.ctx = this.canvas.getContext('2d');	
	this.tiles = new TileSet('Shockbolt_64x64_01.png',TILESIZE,TILESIZE);
	document.addEventListener( 'keydown', doKeyDown, false);
	
	this.viewList = {
		"character" : new View(this.ctx,0,0,CHARVIEWWIDTH,this.canvas.height,charViewUpdate,"darkslategray"),
		"messages"  : new View(this.ctx,CHARVIEWWIDTH,this.canvas.height-MSGVIEWHEIGHT,this.canvas.width-CHARVIEWWIDTH,MSGVIEWHEIGHT,messagesViewUpdate,"darkslategray"),
		"game"		: new View(this.ctx,CHARVIEWWIDTH,0,this.canvas.width-CHARVIEWWIDTH,this.canvas.height-MSGVIEWHEIGHT,gameViewUpdate,"black"),
	}

	this.viewList["game"].mapCol = 0;
	this.viewList["game"].mapRow = 0;
}

Renderer.prototype.update = function() {
	for (key in this.viewList) {
		this.viewList[key].update();
	}
}
Renderer.prototype.clear = function(view) {
	this.ctx.fillStyle = view.bgColor;
	this.ctx.fillRect(view.x,view.y,view.width,view.height);
}


Renderer.prototype.drawText = function(view,str,x,y,color) {
	var dx = x*FONTSIZE	+ view.x; 
	var dy = y*FONTSIZE + view.y;

	this.ctx.font = FONT;
	this.ctx.fillStyle = color;
	this.ctx.fillText(str,dx,dy);
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

function View(ctx,x,y,w,h,update,color) {

	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.ctx = ctx;
	this.update = update;
	this.bgColor = color;

	this.tileRows = parseInt(this.height / TILESIZE);
	this.tileCols = parseInt(this.width / TILESIZE);
}



function charViewUpdate() {
	game.renderer.clear(this);
	game.renderer.drawText(this,"Location: ("+game.player.row.toString()+", "+game.player.col.toString()+")",1,1,"white");
	game.renderer.drawText(this,"Gold: " + game.player.gold.toString(), 1, 5, "white");
}


function centerMap(view) {

	if (game.player.row <= view.mapRow + 2) {
		view.mapRow = Math.max(0,view.mapRow - 5);
	}
	else if (game.player.row >= view.mapRow + view.tileRows - 2) {
		view.mapRow = Math.min(view.mapRow + 5,game.map.rows);
	}
	if (game.player.col <= view.mapCol + 2) {
		view.mapCol = Math.max(0,view.mapCol - 5);
	}
	else if (game.player.col >= view.mapCol + view.tileCols - 2) {
		view.mapCol = Math.min(view.mapCol + 5,game.map.cols);
	}
}

function gameViewUpdate() {


	centerMap(this);


	game.renderer.clear(this);

	var o;
	for (var row = 0; row < this.tileRows; row++) {
		for (var col = 0;col < this.tileCols; col++) {
			var mapR = this.mapRow + row;
			var mapC = this.mapCol + col;

			if (!game.map.explored(mapR,mapC)) {
				continue;
			}

			o = game.map.getBase(mapR,mapC);
			game.renderer.drawTile(this,o.tile,col,row);

			if (game.map.hasObject(mapR,mapC)) {
				o = game.map.getObject(mapR,mapC);
				game.renderer.drawTile(this,o.tile,col,row);
			}

			if (game.map.hasCreature(mapR,mapC)) {
				o = game.map.getCreature(mapR,mapC);
				game.renderer.drawTile(this,o.tile,col,row);
			}
		}
	}

	if (game.flags["showTile"]) {
		game.renderer.drawTile(game.debug.tileIndex,0,0);		
	}
}

function messagesViewUpdate() {

	var c = 0;
	game.renderer.clear(this);
	for (i = game.messages.count()-1; i >= 0; i--) {
		var m = game.messages.get(i);
		c++;
		if (c>6) {
			break;
		}
		game.renderer.drawText(this,m.str,3,c,"white");
	}
}








