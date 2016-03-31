(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SmartLogger = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports =
 {
   styles:{
        log:"color: black; font-style: italic; background-color: white;padding: 2px",
        warn:"color: yellow; font-style: italic; background-color: blue;padding: 2px",
        info:"color: white; font-style: italic; background-color: blue;padding: 2px",
        error:"color: yellow; font-style: italic; background-color: red;padding: 2px"
      }
}

},{}],2:[function(require,module,exports){
module.exports = {
  LogLevel:{
    log:"log",
    warn:"warn",
    info:"info",
    error:"error"
  }
}

},{}],3:[function(require,module,exports){
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

},{"./decorator.js":1,"./enum.js":2,"./util.js":4}],4:[function(require,module,exports){
module.exports = {
  util:new function(){
    return{
      isUndefined:function(arg){
        return typeof arg === "undefined";
      },
      isNumber:function(arg){
        return !isNaN(arg);
      },
      isBoolean:function(arg){
        return typeof arg === "boolean";
      },
      isString:function(arg){
        return typeof arg === "string";
      },
      isFunction:function(arg){
        return typeof arg === "function";
      },
      isArray:function(arg){
        return Array.isArray(arg);
      }
    }
  }
}

},{}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL21haGF2MDA1L0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL2RlY29yYXRvci5qcyIsImpzL2VudW0uanMiLCJqcy9tYWluLmpzIiwianMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9XHJcbiB7XHJcbiAgIHN0eWxlczp7XHJcbiAgICAgICAgbG9nOlwiY29sb3I6IGJsYWNrOyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlO3BhZGRpbmc6IDJweFwiLFxyXG4gICAgICAgIHdhcm46XCJjb2xvcjogeWVsbG93OyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IGJsdWU7cGFkZGluZzogMnB4XCIsXHJcbiAgICAgICAgaW5mbzpcImNvbG9yOiB3aGl0ZTsgZm9udC1zdHlsZTogaXRhbGljOyBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO3BhZGRpbmc6IDJweFwiLFxyXG4gICAgICAgIGVycm9yOlwiY29sb3I6IHllbGxvdzsgZm9udC1zdHlsZTogaXRhbGljOyBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7cGFkZGluZzogMnB4XCJcclxuICAgICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIExvZ0xldmVsOntcclxuICAgIGxvZzpcImxvZ1wiLFxyXG4gICAgd2FybjpcIndhcm5cIixcclxuICAgIGluZm86XCJpbmZvXCIsXHJcbiAgICBlcnJvcjpcImVycm9yXCJcclxuICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBzdHlsZXMgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3IuanNcIikuc3R5bGVzO1xyXG52YXIgbG9nTGV2ZWwgPSByZXF1aXJlKFwiLi9lbnVtLmpzXCIpLkxvZ0xldmVsO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIikudXRpbDtcclxuXHJcbnZhciBvID0gY29uc29sZTtcclxudmFyIHN0eWxlRm9ybWF0dGVyID0gXCIlY1wiO1xyXG5cclxudmFyIGNvbnRhaW5zRm9ybWF0dGVyID0gZnVuY3Rpb24oYXJnLGZvcm1hdCl7XHJcbiAgICB0cnl7XHJcblxyXG4gICAgICByZXR1cm4gYXJnLmluZGV4T2YoZm9ybWF0KSA+PSAwO1xyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBhcHBseVN0eWxlRm9ybWF0dGVyID0gZnVuY3Rpb24oYXJnKXtcclxuICAvL2NvbnNvbGUubG9nKGNvbnRhaW5zRm9ybWF0dGVyKGFyZyxzdHlsZUZvcm1hdHRlcikpO1xyXG4gIHJldHVybiBjb250YWluc0Zvcm1hdHRlcihhcmcsc3R5bGVGb3JtYXR0ZXIpID09PSBmYWxzZT8gc3R5bGVGb3JtYXR0ZXIgKyBhcmc6YXJnO1xyXG59XHJcblxyXG52YXIgbG9nID0gZnVuY3Rpb24oYXJncyxsZXZlbCl7XHJcbiAgLy9jb25zb2xlLmxvZyh1dGlsLmlzQXJyYXkoYXJnc1swXSksIHR5cGVvZiBhcmdzWzBdKTtcclxuXHJcbiAgdmFyIGFyciA9ICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYXJncyxmdW5jdGlvbihpdGVtKXtcclxuICAgIGlmKHV0aWwuaXNTdHJpbmcoaXRlbSkgfHwgdXRpbC5pc0Jvb2xlYW4oaXRlbSkgfHwgdXRpbC5pc051bWJlcihpdGVtKSl7XHJcbiAgICAgIHJldHVybiBhcHBseVN0eWxlRm9ybWF0dGVyKGl0ZW0udG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdmFyIHN0eWxlID0gZnVuY3Rpb24obGV2ZWwpe1xyXG4gICAgdmFyIHJlc3VsdCA9IHN0eWxlcy5sb2c7XHJcbiAgICBzd2l0Y2gobGV2ZWwpe1xyXG4gICAgICBjYXNlIFwiaW5mb1wiOntcclxuICAgICAgICByZXN1bHQgPSBzdHlsZXMuaW5mbztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwid2FyblwiOntcclxuICAgICAgICByZXN1bHQgPSBzdHlsZXMud2FybjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwiZXJyb3JcIjp7XHJcbiAgICAgICAgcmVzdWx0ID0gc3R5bGVzLmVycm9yO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0obGV2ZWwpO1xyXG5cclxuICB2YXIgZm5zID0gW107IHZhciB0ID0gdGhpcztcclxuXHJcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcnIsZnVuY3Rpb24oaXRlbSl7XHJcbiAgICBpZih1dGlsLmlzU3RyaW5nKGl0ZW0pIHx8IHV0aWwuaXNCb29sZWFuKGl0ZW0pKXtcclxuICAgICAgZm5zLnB1c2godC5sb2cuYmluZCh0LGl0ZW0sc3R5bGUpKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBmbnMucHVzaCh0LmxvZy5iaW5kKHQsaXRlbSkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHByaW50T25Db25zb2xlKGZucyk7XHJcbn1cclxuXHJcbnZhciBwcmludE9uQ29uc29sZSA9IGZ1bmN0aW9uKGZucyl7XHJcblxyXG4vLyAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSByZXR1cm47XHJcbiAgby5ncm91cCgpO1xyXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZm5zLGZ1bmN0aW9uKGZuKXtcclxuICAgIGZuKCk7XHJcbiAgfSk7XHJcblxyXG4gIG8ubG9nKG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKSk7XHJcbiAgby5ncm91cEVuZCgpO1xyXG59XHJcblxyXG52YXIgYmluZEFyZ3NUb0FycmF5ID0gZnVuY3Rpb24oYXJncyl7XHJcbiAgaWYodHlwZW9mIGFyZ3MgPT09IFwiYXJyYXlcIil7XHJcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGFyZ3MsZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfSk7XHJcbiAgfWVsc2UgaWYodHlwZW9mIGFyZ3MgPT09IFwib2JqZWN0XCIpe1xyXG4gICAgdmFyIGFyciA9IFtdO1xyXG4gICAgYXJyLnB1c2goYXJncyk7XHJcbiAgICByZXR1cm4gYXJyO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsb2cgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxvZy5jYWxsKG8sYXJndW1lbnRzLGxvZ0xldmVsLmxvZyk7XHJcbiAgICB9LFxyXG4gICAgaW5mbyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxvZy5jYWxsKG8sYXJndW1lbnRzLGxvZ0xldmVsLmluZm8pO1xyXG4gICAgICAgIC8vbG9nLmNhbGwobyxiaW5kQXJnc1RvQXJyYXkoYXJndW1lbnRzKSxsb2dMZXZlbC5pbmZvKTtcclxuICAgIH0sXHJcbiAgICB3YXJuIDogZnVuY3Rpb24oKXtcclxuICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwud2Fybik7XHJcbiAgICAgICAgLy9sb2cuY2FsbChvLGJpbmRBcmdzVG9BcnJheShhcmd1bWVudHMpLGxvZ0xldmVsLndhcm4pO1xyXG4gICAgfSxcclxuICAgIGVycm9yIDogZnVuY3Rpb24oKXtcclxuICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwuZXJyb3IpO1xyXG4gICAgICAgIC8vbG9nLmNhbGwobyxiaW5kQXJnc1RvQXJyYXkoYXJndW1lbnRzKSxsb2dMZXZlbC5lcnJvcik7XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgdXRpbDpuZXcgZnVuY3Rpb24oKXtcclxuICAgIHJldHVybntcclxuICAgICAgaXNVbmRlZmluZWQ6ZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgfSxcclxuICAgICAgaXNOdW1iZXI6ZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKGFyZyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGlzQm9vbGVhbjpmdW5jdGlvbihhcmcpe1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSBcImJvb2xlYW5cIjtcclxuICAgICAgfSxcclxuICAgICAgaXNTdHJpbmc6ZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIjtcclxuICAgICAgfSxcclxuICAgICAgaXNGdW5jdGlvbjpmdW5jdGlvbihhcmcpe1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGlzQXJyYXk6ZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
