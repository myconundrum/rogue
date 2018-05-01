function TileSet(path,width,height) {

	this.path = path;
	this.tileWidth = width;
	this.tileHeight = height;
	
	this.img = new Image();
	var thisref = this;

	
	this.img.onload = function() {

		console.log("Loaded TileSet from " + path + ".");

		thisref.tilesPerLine 	= thisref.img.naturalWidth/thisref.tileWidth;
		thisref.numLines 		= thisref.img.naturalHeight/thisref.tileHeight;
		thisref.maxIndex 		= thisref.tilesPerLine * thisref.numLines - 1;

		console.log("   " + (thisref.tilesPerLine * thisref.numLines).toString() + " " + thisref.tileWidth.toString() + "X" + 
			thisref.tileHeight.toString() + " tiles loaded.");

	};

	this.img.src = this.path;
}



