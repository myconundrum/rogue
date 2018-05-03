


function GameMessages() {
    this.reduce = 100;
    this.data = new Array();
 }


GameMessages.prototype.count = function() {return this.data.length;}
GameMessages.prototype.get= function(i) {
	return this.data[i];
}

GameMessages.prototype.sendMessage = function(subsystem,priority,string) {

    var n = new Message();
    n.subsystem = subsystem;
    n.priority = priority;
    n.str = string;

    this.data.push(n);
    if (this.data.length > this.reduce*2) {
            this.data = this.data.slice(this.reduce*-1);
    }
}

function Message() {
    this.str        = "";
    this.priority   = 0;
    this.subsystem  = "";
}
