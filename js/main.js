"use strict";
var styles = require("./decorator.js").styles;
var logLevel = require("./enum.js").LogLevel;
var util = require("./util.js").util;

var o = console;
var styleFormatter = "%c";

var containsFormatter = function(arg,format){
    try{

      return arg.indexOf(format) >= 0;
    }catch(e){
      return false;
    }
}

var applyStyleFormatter = function(arg){
  //console.log(containsFormatter(arg,styleFormatter));
  return containsFormatter(arg,styleFormatter) === false? styleFormatter + arg:arg;
}

var log = function(args,level){
  //console.log(util.isArray(args[0]), typeof args[0]);

  var arr =  Array.prototype.map.call(args,function(item){
    if(util.isString(item) || util.isBoolean(item) || util.isNumber(item)){
      return applyStyleFormatter(item.toString());
    }
    else{
      return item;
    }
  });

  var style = function(level){
    var result = styles.log;
    switch(level){
      case "info":{
        result = styles.info;
        break;
      }
      case "warn":{
        result = styles.warn;
        break;
      }
      case "error":{
        result = styles.error;
        break;
      }
    }
    return result;
  }(level);

  var fns = []; var t = this;

  Array.prototype.forEach.call(arr,function(item){
    if(util.isString(item) || util.isBoolean(item)){
      fns.push(t.log.bind(t,item,style));
    }else{
      fns.push(t.log.bind(t,item));
    }
  });
  printOnConsole(fns);
}

var printOnConsole = function(fns){

//  if(typeof fn !== 'function') return;
  o.group();
  Array.prototype.forEach.call(fns,function(fn){
    fn();
  });

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
        log.call(o,arguments,logLevel.log);
    },
    info : function(){
      log.call(o,arguments,logLevel.info);
        //log.call(o,bindArgsToArray(arguments),logLevel.info);
    },
    warn : function(){
      log.call(o,arguments,logLevel.warn);
        //log.call(o,bindArgsToArray(arguments),logLevel.warn);
    },
    error : function(){
      log.call(o,arguments,logLevel.error);
        //log.call(o,bindArgsToArray(arguments),logLevel.error);
    }
}
