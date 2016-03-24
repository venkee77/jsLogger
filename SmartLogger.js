"use strict"
(function (exports) {
  var styles = {
    log:{color: yellow; font-style: italic; background-color: blue;padding: 2px},
    warn:{color: yellow; font-style: italic; background-color: blue;padding: 2px},
    info:{color: white; font-style: italic; background-color: blue;padding: 2px},
    error:{color: white; font-style: italic; background-color: red;padding: 2px}
  }

  var o = console;
  var styleFormatter = "%c";

  var containsFormatter = function(format){
    return this.indexOf(format) >= 0;
  }

  var applyStyleFormatter = function(){
    this = this || [];
    if(this.length === 0 ) {return this;}
    this[0] = containsFormatter.call(this[0],styleFormatter) === false? styleFormatter + this[0]:this[0];

    return this;
  }

  var log = function(args){
    args = applyStyleFormatter.call(args);
    args.push(styles.log);
    this.log.apply(this,args);
  }

  var warn = function(args){
    args = applyStyleFormatter.call(args);
    args.push(styles.warn);
    this.warn.apply(this,args);
  }

  var info = function(args){
    args = applyStyleFormatter.call(args);
    args.push(styles.info);
    this.info.apply(this,args);
  }

  var error = function(args){
    args = applyStyleFormatter.call(args);
    args.push(styles.error);
    this.error.apply(this,args);
  }

  exports.log = function () {
          log.apply(o,arguments);
        };
  exports.warn = function () {
        warn.apply(o,arguments);
        };
  exports.info = function () {
        info.apply(o,arguments);
        };
  exports.error = function () {
        error.apply(o,arguments);
        };
})(typeof exports === "undefined"?this['SmartLogger']={}:exports);
