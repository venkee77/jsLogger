"use strict";
var styles = require("./decorator.js").styles;
var logLevel = require("./enum.js").LogLevel;
var util = require("./util.js").util;

var o = console;
var styleFormatter = "%c";

var _defaults = {
  style:styles.log,
  func:o.log
}

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
  var fn = _defaults.func;
  var style = styles[level];

  var arr =  Array.prototype.map.call(args,function(item){
    if(util.isString(item) || util.isBoolean(item) || util.isNumber(item)){
      return applyStyleFormatter(item.toString());
    }
    else{
      return item;
    }
  });

  fn = self[level];
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

var setConfig = function(obj){
  if('styles' in obj){
    var s = obj['styles'];
    if('log' in s){
      _defaults.style = styles.log = s['log'];
    }
    if('info' in s){
      styles.info = s['info'];
    }
    if('warn' in s){
      styles.warn = s['warn'];
    }
    if('error' in s){
      styles.error = s['error'];
    }
  }
}

module.exports = {
    init:function(obj){
      setConfig(obj);
    },
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
