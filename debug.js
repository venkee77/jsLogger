"use strict";
Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}


"use strict";
class smartLogger {
  constructor(thread,level) {
    this.aLevels = ["INFO","WARN","ERROR","DEBUG","CRITICAL"];
    this.thread = thread;
    this.level = level;
  }
  
  print(msg,level) {
	 var d = new Date,
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
     
	
    if (typeof level == 'undefined'){
		if (this.aLevels.indexOf(level) == -1){
			level = this.level;
		}
	}
	if (level == "INFO"){
		 console.log("%c"+" ["+dformat+"]["+this.thread+"] :I: "+msg,"background:#0000ff;color:#fff;font-size:16px");
	} else if (level == "WARN"){
		console.log("%c"+" ["+dformat+"]["+this.thread+"] :W: "+msg,"background:#ffa500;color:#fff;font-size:16px");
	} else if (level == "ERROR"){
		console.log("%c"+" ["+dformat+"]["+this.thread+"] :E: "+msg,"background:#ff0000;color:#fff;font-size:16px");
	} else if (level == "DEBUG"){
		console.log("%c"+" ["+dformat+"]["+this.thread+"] :D: "+msg,"background:#00ff00;color:#fff;font-size:16px");
	} else if (level == "CRITICAL"){
		console.log("%c"+" ["+dformat+"]["+this.thread+"] :C: "+msg,"background:#ff0000;color:#000;font-size:16px");	 	 
	} else {
		console.log(" ["+dformat+"]["+this.thread+"] :: U "+msg);
		 console.log(msg);
	}
 
}
}

const mlogger = new smartLogger("MAIN","INFO");
const tlogger = new smartLogger("THREAD1","INFO");

mlogger.print("Hello World","INFO");
mlogger.print("Hello World","WARN");
mlogger.print("Hello World","ERROR");
mlogger.print("Hello World");
tlogger.print("Hello World");
tlogger.print("Hello World","DEBUG");
tlogger.print("Hello World","CRITICAL");