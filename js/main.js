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
  return containsFormatter(arg,styleFormatter) === false? styleFormatter + arg:arg;
}

var log = function(args,level){
  var fns = []; var self = this;

  var arr =  Array.prototype.map.call(args,function(item){
    if(util.isString(item) || util.isBoolean(item) || util.isNumber(item)){
      return applyStyleFormatter(item.toString());
    }
    else{
      return item;
    }
  });

  var fn = self.log;
  var style = function(level){
    var result = styles.log;
    switch(level){
      case "info":{
        result = styles.info;
        fn = self.info;
        break;
      }
      case "warn":{
        result = styles.warn;
        fn = self.warn;
        break;
      }
      case "error":{
        result = styles.error;
        fn = self.error;
        break;
      }
    }
    return result;
  }(level);

  Array.prototype.forEach.call(arr,function(item){
    if(util.isString(item)){
      fns.push(fn.bind(self,item,style));
    }else{
      fns.push(fn.bind(self,item));
    }
  });
  printOnConsole(fns);
}

var printOnConsole = function(fns){
  o.group();
  Array.prototype.forEach.call(fns,function(fn){
    fn();
  });

  o.log(new Date().toLocaleString());
  o.groupEnd();
}

module.exports = {
    log : function(){
        log.call(o,arguments,logLevel.log);
    },
    info : function(){
      log.call(o,arguments,logLevel.info);
    },
    warn : function(){
      log.call(o,arguments,logLevel.warn);
    },
    error : function(){
      log.call(o,arguments,logLevel.error);
    }
}
