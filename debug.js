"use strict";
Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}


"use strict";
class smartLogger {
  constructor(thread,level) {
    this.aLevels = ["INFO","WARN","ERROR"];
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
		 console.log("%c"+" ["+dformat+"]["+this.thread+"] :: "+msg,"background:#0000ff;color:#fff;font-size:16px");
	} else if (level == "WARN"){
		console.log("%c"+" ["+dformat+"]["+this.thread+"] :: "+msg,"background:#ffa500;color:#fff;font-size:16px");
	} else if (level == "ERROR"){
		console.log("%c"+" ["+dformat+"]["+this.thread+"] :: "+msg,"background:#ff0000;color:#fff;font-size:16px");
		 
	} else {
		console.log(" ["+dformat+"]["+this.thread+"] :: "+msg);
		 console.log(msg);
	}
 
}
}

const logger = new smartLogger("MAIN","INFO");

logger.print("Hello World","INFO");
logger.print("Hello World","WARN");
logger.print("Hello World","ERROR");
logger.print("Hello World");