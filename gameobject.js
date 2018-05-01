

var NOWHERE = -1;


function GameObject(name) {


	for (c in cfg_data.objects) {
		if (cfg_data.objects[c].name == name) {
			Object.assign(this,cfg_data.objects[c]);
		}
	}

	this.row = NOWHERE;
	this.col = NOWHERE;


}


/* game logic flags functions */
GameObject.prototype.hasFlag = function(flag) {

	return this.flags.indexOf(flag) != -1;
}

GameObject.prototype.setFlag = function(flag) {
	if (!this.hasFlag(flag)) {
		this.flags.push(flag);
	}
}

GameObject.prototype.clearFlag = function(flag) {
	this.flags = this.flags.remove(f => f !== flag );
}


function replacer(match, p1, p2, p3, offset, string) {
  
	return go_curobj[match.slice(1)].toString();
}


var go_curobj;

GameObject.prototype.getMessage = function (message) {

	go_curobj = this;
	s = new String(this[message]);
	s = s.replace(/%\w+/gm,replacer)

	return s;
}
