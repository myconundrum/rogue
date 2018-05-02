//
// creates a field of points that are weighted by distance from the center. 
// the weight formula is 1 / (distance from center + 1)
//
// the field will naturally decay each turn -- the amount of decay is set in the
// decay field. Points are removed when the point weight is less than zero. 
// so a decay of 0 means points are never removed, and 100 means they will be removed
// during the first update. 
//
//
// Note -- the field expects two functions isValid() which returns true if a particular x,y is a valid location
// and isTransparent() which returns true if a particular x,y lets rays pass through. 
// If Ghost is set, rays always pass through, ignoring isTransparent().
//
//
// If you set the "keepOld" flag, the field will keep old points from the last cast.
// otherwise, cast is destructive of the old field.
//



function Field(isValid,isTransparent) {

    //
    // radius of the field
    //
    this.radius         = 0;                
    this.decay          = 0;                
    this.points         = new Array();      
    this.center         = new Point(0,0);   
    this.ghost          = false;
    this.keepOld        = false;
    this.isValid        = isValid;
    this.isTransparent  = isTransparent;


}

Field.prototype.setRadius = function(r) {
    this.radius = r;
}

Field.prototype.setCenter = function (x,y) {
    this.center = new Point(x,y);
}

Field.prototype.setGhost = function (f) {
    this.ghost = f;
}

Field.prototype.setKeepOld = function (f) {
    this.keepOld = f;
}

Field.prototype.setDecay = function (d) {
    this.decay = d;
}

Field.prototype.updateList = function(list) {

    var oldList = this.points;
    this.points = dedupePoints(list);

    if (this.keepOld) {

        for (i = 0; i < oldList.length; i++) {
            var found = false;
            for (j = 0; j < this.points.length; j++) {
                if (oldList[i].matches(this.points[j])) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                this.points.push(oldList[i]);
            }
        }
    }   
}

Field.prototype.cast = function() {

    var dx = -this.radius;
    var dy = -this.radius;
    var n = new Array();

    //
    // cast rays to max range in quarters
    //
    while (dx < this.radius)  {this.castRay(dx++, dy, n);}
    while (dy < this.radius)  {this.castRay(dx, dy++, n);}
    while (dx > -this.radius) {this.castRay(dx--, dy, n);}
    while (dy > -this.radius) {this.castRay(dx, dy--, n);}

    //
    // update the list of points in this field.
    //
    this.updateList(n);
} 


Field.prototype.castRay = function(dirX,dirY,touched) {

    var x           = this.center.x
    var y           = this.center.y;
    var dx          = Math.abs(dirX);
    var dy          = Math.abs(dirY);
    var sx          = (dirX > 0) ? 1 : -1; //sign
    var sy          = (dirY > 0) ? 1 : -1; //sign
    var err         = dx - dy;
    var xSum        = 0;
    var ySum        = 0;

    var done        = false;

    while (!done) {

        //
        //max range reached?
        //
        if (xSum * xSum + ySum * ySum >= this.radius * this.radius) {
            break;
        }
        
        //
        //check for out of bounds.
        //
        done = !this.isValid(x,y);
        if (done) {
            break;
        }

        //
        // Remember that we touched this point.
        //
        var n = new Point(x,y);
        n.weight = 1/(pointsDistance(this.center,n)+1);
        touched.push(n);

        //
        // check to see if we should block our LOS
        //
        if (!this.ghost && !this.isTransparent(x,y)) {
            done = true;
            break;
        }

        var e2 = (2 * err);


        if (e2 > -dy) {
            xSum++;
            err -= dy;
            x += sx;
        }

        if (e2 < dx) {
            ySum++;
            err += dx;
            y += sy;
        }
    }
}

//
// see if a point lies in the field and return its weight. Otherwise, return -1;
//
Field.prototype.getWeight = function(pt) {

    for (var i = 0; i < this.points.length;i++) {
        if (pt.matches(this.points[i])) {
            return this.points[i].weight;
        }
    }

    return -1;
}



//
// updates a field by decaying weights and pruning any no longer in field
// tiles.
//
Field.prototype.update = function() {

    var n = new Array();
    for (var i = 0; i < this.points.length; i++) {

        this.points[i].weight -= this.decay;
        if (this.points[i].weight > 0) {
            n.push(this.points[i]);
        }
    }
    this.points = n;
}

