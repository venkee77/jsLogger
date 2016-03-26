"use strict";
(function (exports) {
  var styles = {
    log:"color: black; font-style: italic; background-color: white;padding: 2px",
    warn:"color: yellow; font-style: italic; background-color: blue;padding: 2px",
    info:"color: white; font-style: italic; background-color: blue;padding: 2px",
    error:"color: yellow; font-style: italic; background-color: red;padding: 2px"
  }

  var o = console;
  var styleFormatter = "%c";

  var containsFormatter = function(format){
    return this.indexOf(format) >= 0;
  }

  var applyStyleFormatter = function(){
    if(this.length === 0 ) {return this;}
    this[0] = containsFormatter.call(this[0],styleFormatter) === false? styleFormatter + this[0]:this[0];
    return this;
  }

  var log = function(args){
    var arr = [];
    arr = applyStyleFormatter.call(args);
    printOnConsole(this.log.bind(this),Array.prototype.join.call(arr,", "),styles.log);
  }

  var info = function(args){
    var arr = [];
    arr = applyStyleFormatter.call(args);
    printOnConsole(this.info.bind(this),Array.prototype.join.call(arr,", "),styles.info);
  }

  var warn = function(args){
    var arr = [];
    arr = applyStyleFormatter.call(args);
    printOnConsole(this.warn.bind(this),Array.prototype.join.call(arr,", "),styles.warn);
  }

  var error = function(args){
    var arr = [];
    arr = applyStyleFormatter.call(args);
    printOnConsole(this.error.bind(this),Array.prototype.join.call(arr,", "),styles.error);
  }

  var printOnConsole = function(fn,arg1,arg2){

    if(typeof fn !== 'function') return;
    o.group();
    fn(arg1,arg2);
    o.log(new Date().getTime());
    o.groupEnd();
  }

  var bindArgsToArray = function(args){
    if(typeof args === "array"){
      return Array.prototype.map.call(args,function(item){
        return item;
      });
    }else if(typeof args === "object"){
      var arr = [];
      arr.push(args);
      return arr;
    }
  }

  exports.log = function(){
            var a = bindArgsToArray(arguments);
            log.apply(o,bindArgsToArray(arguments));
  }
  exports.info = function(){
            info.apply(o,bindArgsToArray(arguments));
  }
  exports.warn = function(){
            warn.apply(o,bindArgsToArray(arguments));
  }
  exports.error = function(){
            error.apply(o,bindArgsToArray(arguments));
  }

})(typeof exports === "undefined"?this['SmartLogger']={}:exports);
