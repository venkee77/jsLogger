"use strict";
var styles = require("./decorator.js").styles;

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
  printOnConsole(this.log.bind(this,Array.prototype.join.call(arr,", "),styles.log));
}

var info = function(args){
  var arr = [];
  arr = applyStyleFormatter.call(args);
  printOnConsole(this.info.bind(this,Array.prototype.join.call(arr,", "),styles.info));
}

var warn = function(args){
  var arr = [];
  arr = applyStyleFormatter.call(args);
  printOnConsole(this.warn.bind(this,Array.prototype.join.call(arr,", "),styles.warn));
}

var error = function(args){
  var arr = [];
  arr = applyStyleFormatter.call(args);
  printOnConsole(this.error.bind(this,Array.prototype.join.call(arr,", "),styles.error));
}

var printOnConsole = function(fn,arg1,arg2){

  if(typeof fn !== 'function') return;
  o.group();
  fn();
  o.log(new Date().toLocaleString());
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

module.exports = {
      log : function(){
                log.apply(o,bindArgsToArray(arguments));
      },
      info : function(){
                info.apply(o,bindArgsToArray(arguments));
      },
      warn : function(){
                warn.apply(o,bindArgsToArray(arguments));
      },
      error : function(){
                error.apply(o,bindArgsToArray(arguments));
      }
    }
