

/*
utility functions
*/

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function pointsDistance(p1,p2) {

    var t1 = p2.x - p1.x;
    var t2 = p2.y - p1.y;
    var d = Math.sqrt(t1*t1 + t2*t2);

    return d;
}

function dedupePoints(a) {

    var r = new Array();
    var found = false;

    //
    // reduce returned array to only one of each points.
    //
    for (i = 0; i < a.length; i++) {
        found = false; 
        for (j = 0; j < r.length; j++) {
            if (r[j].matches(a[i])) {
                found = true;
            }
        }

        if (!found) {
            r.push(a[i]);
        }
    }

    return r;
}

function Point(x,y) {
	this.x = x;
	this.y = y;
	this.set = function(x,y) {
		this.x = x;
		this.y = y;
	}
    this.setp = function(p) {
        this.x = p.x;
        this.y = p.y;
    }
	this.matches = function(p) {
		return (this.x === p.x) && (this.y === p.y);
	}
}


function isValid(x,y) {
	return game.map.validLoc(y,x);
}

function isTransparent(x,y) {
	return isValid(x,y) && game.map.getBase(y,x).hasFlag('TRANSPARENT');
}
