(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SmartLogger = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports =
 {
   styles:{
        log:"color: black; font-style: italic; background-color: white;padding: 2px",
        warn:"color: blue; font-style: italic; background-color: yellow;padding: 2px",
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

  var arr =  Array.prototype.map.call(args,function(item){
    if(util.isString(item) || util.isBoolean(item) || util.isNumber(item)){
      return applyStyleFormatter(item.toString());
    }
    else{
      return item;
    }
  });

  var fn = _defaults.func;
  var style = function(level){
    var result = _defaults.style;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9kZWNvcmF0b3IuanMiLCJqcy9lbnVtLmpzIiwianMvbWFpbi5qcyIsImpzL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4ge1xuICAgc3R5bGVzOntcbiAgICAgICAgbG9nOlwiY29sb3I6IGJsYWNrOyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlO3BhZGRpbmc6IDJweFwiLFxuICAgICAgICB3YXJuOlwiY29sb3I6IGJsdWU7IGZvbnQtc3R5bGU6IGl0YWxpYzsgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O3BhZGRpbmc6IDJweFwiLFxuICAgICAgICBpbmZvOlwiY29sb3I6IHdoaXRlOyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IGJsdWU7cGFkZGluZzogMnB4XCIsXG4gICAgICAgIGVycm9yOlwiY29sb3I6IHllbGxvdzsgZm9udC1zdHlsZTogaXRhbGljOyBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7cGFkZGluZzogMnB4XCJcbiAgICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBMb2dMZXZlbDp7XG4gICAgbG9nOlwibG9nXCIsXG4gICAgd2FybjpcIndhcm5cIixcbiAgICBpbmZvOlwiaW5mb1wiLFxuICAgIGVycm9yOlwiZXJyb3JcIlxuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBzdHlsZXMgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3IuanNcIikuc3R5bGVzO1xudmFyIGxvZ0xldmVsID0gcmVxdWlyZShcIi4vZW51bS5qc1wiKS5Mb2dMZXZlbDtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKS51dGlsO1xuXG52YXIgbyA9IGNvbnNvbGU7XG52YXIgc3R5bGVGb3JtYXR0ZXIgPSBcIiVjXCI7XG5cbnZhciBfZGVmYXVsdHMgPSB7XG4gIHN0eWxlOnN0eWxlcy5sb2csXG4gIGZ1bmM6by5sb2dcbn1cblxudmFyIGNvbnRhaW5zRm9ybWF0dGVyID0gZnVuY3Rpb24oYXJnLGZvcm1hdCl7XG4gICAgdHJ5e1xuICAgICAgcmV0dXJuIGFyZy5pbmRleE9mKGZvcm1hdCkgPj0gMDtcbiAgICB9Y2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG52YXIgYXBwbHlTdHlsZUZvcm1hdHRlciA9IGZ1bmN0aW9uKGFyZyl7XG4gIHJldHVybiBjb250YWluc0Zvcm1hdHRlcihhcmcsc3R5bGVGb3JtYXR0ZXIpID09PSBmYWxzZT8gc3R5bGVGb3JtYXR0ZXIgKyBhcmc6YXJnO1xufVxuXG52YXIgbG9nID0gZnVuY3Rpb24oYXJncyxsZXZlbCl7XG4gIHZhciBmbnMgPSBbXTsgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBhcnIgPSAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGFyZ3MsZnVuY3Rpb24oaXRlbSl7XG4gICAgaWYodXRpbC5pc1N0cmluZyhpdGVtKSB8fCB1dGlsLmlzQm9vbGVhbihpdGVtKSB8fCB1dGlsLmlzTnVtYmVyKGl0ZW0pKXtcbiAgICAgIHJldHVybiBhcHBseVN0eWxlRm9ybWF0dGVyKGl0ZW0udG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBmbiA9IF9kZWZhdWx0cy5mdW5jO1xuICB2YXIgc3R5bGUgPSBmdW5jdGlvbihsZXZlbCl7XG4gICAgdmFyIHJlc3VsdCA9IF9kZWZhdWx0cy5zdHlsZTtcbiAgICBzd2l0Y2gobGV2ZWwpe1xuICAgICAgY2FzZSBcImluZm9cIjp7XG4gICAgICAgIHJlc3VsdCA9IHN0eWxlcy5pbmZvO1xuICAgICAgICBmbiA9IHNlbGYuaW5mbztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwid2FyblwiOntcbiAgICAgICAgcmVzdWx0ID0gc3R5bGVzLndhcm47XG4gICAgICAgIGZuID0gc2VsZi53YXJuO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJlcnJvclwiOntcbiAgICAgICAgcmVzdWx0ID0gc3R5bGVzLmVycm9yO1xuICAgICAgICBmbiA9IHNlbGYuZXJyb3I7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KGxldmVsKTtcblxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGFycixmdW5jdGlvbihpdGVtKXtcbiAgICBpZih1dGlsLmlzU3RyaW5nKGl0ZW0pKXtcbiAgICAgIGZucy5wdXNoKGZuLmJpbmQoc2VsZixpdGVtLHN0eWxlKSk7XG4gICAgfWVsc2V7XG4gICAgICBmbnMucHVzaChmbi5iaW5kKHNlbGYsaXRlbSkpO1xuICAgIH1cbiAgfSk7XG4gIHByaW50T25Db25zb2xlKGZucyk7XG59XG5cbnZhciBwcmludE9uQ29uc29sZSA9IGZ1bmN0aW9uKGZucyl7XG4gIG8uZ3JvdXAoKTtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChmbnMsZnVuY3Rpb24oZm4pe1xuICAgIGZuKCk7XG4gIH0pO1xuXG4gIG8ubG9nKG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKSk7XG4gIG8uZ3JvdXBFbmQoKTtcbn1cblxudmFyIHNldENvbmZpZyA9IGZ1bmN0aW9uKG9iail7XG4gIGlmKCdzdHlsZXMnIGluIG9iail7XG4gICAgdmFyIHMgPSBvYmpbJ3N0eWxlcyddO1xuICAgIGlmKCdsb2cnIGluIHMpe1xuICAgICAgX2RlZmF1bHRzLnN0eWxlID0gc3R5bGVzLmxvZyA9IHNbJ2xvZyddO1xuICAgIH1cbiAgICBpZignaW5mbycgaW4gcyl7XG4gICAgICBzdHlsZXMuaW5mbyA9IHNbJ2luZm8nXTtcbiAgICB9XG4gICAgaWYoJ3dhcm4nIGluIHMpe1xuICAgICAgc3R5bGVzLndhcm4gPSBzWyd3YXJuJ107XG4gICAgfVxuICAgIGlmKCdlcnJvcicgaW4gcyl7XG4gICAgICBzdHlsZXMuZXJyb3IgPSBzWydlcnJvciddO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0OmZ1bmN0aW9uKG9iail7XG4gICAgICBzZXRDb25maWcob2JqKTtcbiAgICB9LFxuICAgIGxvZyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGxvZy5jYWxsKG8sYXJndW1lbnRzLGxvZ0xldmVsLmxvZyk7XG4gICAgfSxcbiAgICBpbmZvIDogZnVuY3Rpb24oKXtcbiAgICAgIGxvZy5jYWxsKG8sYXJndW1lbnRzLGxvZ0xldmVsLmluZm8pO1xuICAgIH0sXG4gICAgd2FybiA6IGZ1bmN0aW9uKCl7XG4gICAgICBsb2cuY2FsbChvLGFyZ3VtZW50cyxsb2dMZXZlbC53YXJuKTtcbiAgICB9LFxuICAgIGVycm9yIDogZnVuY3Rpb24oKXtcbiAgICAgIGxvZy5jYWxsKG8sYXJndW1lbnRzLGxvZ0xldmVsLmVycm9yKTtcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdXRpbDpuZXcgZnVuY3Rpb24oKXtcbiAgICByZXR1cm57XG4gICAgICBpc1VuZGVmaW5lZDpmdW5jdGlvbihhcmcpe1xuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIH0sXG4gICAgICBpc051bWJlcjpmdW5jdGlvbihhcmcpe1xuICAgICAgICByZXR1cm4gIWlzTmFOKGFyZyk7XG4gICAgICB9LFxuICAgICAgaXNCb29sZWFuOmZ1bmN0aW9uKGFyZyl7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSBcImJvb2xlYW5cIjtcbiAgICAgIH0sXG4gICAgICBpc1N0cmluZzpmdW5jdGlvbihhcmcpe1xuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIjtcbiAgICAgIH0sXG4gICAgICBpc0Z1bmN0aW9uOmZ1bmN0aW9uKGFyZyl7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9LFxuICAgICAgaXNBcnJheTpmdW5jdGlvbihhcmcpe1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
