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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL21haGF2MDA1L0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL2RlY29yYXRvci5qcyIsImpzL2VudW0uanMiLCJqcy9tYWluLmpzIiwianMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID1cclxuIHtcclxuICAgc3R5bGVzOntcclxuICAgICAgICBsb2c6XCJjb2xvcjogYmxhY2s7IGZvbnQtc3R5bGU6IGl0YWxpYzsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7cGFkZGluZzogMnB4XCIsXHJcbiAgICAgICAgd2FybjpcImNvbG9yOiBibHVlOyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IHllbGxvdztwYWRkaW5nOiAycHhcIixcclxuICAgICAgICBpbmZvOlwiY29sb3I6IHdoaXRlOyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IGJsdWU7cGFkZGluZzogMnB4XCIsXHJcbiAgICAgICAgZXJyb3I6XCJjb2xvcjogeWVsbG93OyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IHJlZDtwYWRkaW5nOiAycHhcIlxyXG4gICAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgTG9nTGV2ZWw6e1xyXG4gICAgbG9nOlwibG9nXCIsXHJcbiAgICB3YXJuOlwid2FyblwiLFxyXG4gICAgaW5mbzpcImluZm9cIixcclxuICAgIGVycm9yOlwiZXJyb3JcIlxyXG4gIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIHN0eWxlcyA9IHJlcXVpcmUoXCIuL2RlY29yYXRvci5qc1wiKS5zdHlsZXM7XHJcbnZhciBsb2dMZXZlbCA9IHJlcXVpcmUoXCIuL2VudW0uanNcIikuTG9nTGV2ZWw7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKS51dGlsO1xyXG5cclxudmFyIG8gPSBjb25zb2xlO1xyXG52YXIgc3R5bGVGb3JtYXR0ZXIgPSBcIiVjXCI7XHJcblxyXG52YXIgY29udGFpbnNGb3JtYXR0ZXIgPSBmdW5jdGlvbihhcmcsZm9ybWF0KXtcclxuICAgIHRyeXtcclxuICAgICAgcmV0dXJuIGFyZy5pbmRleE9mKGZvcm1hdCkgPj0gMDtcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgYXBwbHlTdHlsZUZvcm1hdHRlciA9IGZ1bmN0aW9uKGFyZyl7XHJcbiAgcmV0dXJuIGNvbnRhaW5zRm9ybWF0dGVyKGFyZyxzdHlsZUZvcm1hdHRlcikgPT09IGZhbHNlPyBzdHlsZUZvcm1hdHRlciArIGFyZzphcmc7XHJcbn1cclxuXHJcbnZhciBsb2cgPSBmdW5jdGlvbihhcmdzLGxldmVsKXtcclxuICB2YXIgZm5zID0gW107IHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgdmFyIGFyciA9ICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYXJncyxmdW5jdGlvbihpdGVtKXtcclxuICAgIGlmKHV0aWwuaXNTdHJpbmcoaXRlbSkgfHwgdXRpbC5pc0Jvb2xlYW4oaXRlbSkgfHwgdXRpbC5pc051bWJlcihpdGVtKSl7XHJcbiAgICAgIHJldHVybiBhcHBseVN0eWxlRm9ybWF0dGVyKGl0ZW0udG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdmFyIGZuID0gc2VsZi5sb2c7XHJcbiAgdmFyIHN0eWxlID0gZnVuY3Rpb24obGV2ZWwpe1xyXG4gICAgdmFyIHJlc3VsdCA9IHN0eWxlcy5sb2c7XHJcbiAgICBzd2l0Y2gobGV2ZWwpe1xyXG4gICAgICBjYXNlIFwiaW5mb1wiOntcclxuICAgICAgICByZXN1bHQgPSBzdHlsZXMuaW5mbztcclxuICAgICAgICBmbiA9IHNlbGYuaW5mbztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwid2FyblwiOntcclxuICAgICAgICByZXN1bHQgPSBzdHlsZXMud2FybjtcclxuICAgICAgICBmbiA9IHNlbGYud2FybjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFwiZXJyb3JcIjp7XHJcbiAgICAgICAgcmVzdWx0ID0gc3R5bGVzLmVycm9yO1xyXG4gICAgICAgIGZuID0gc2VsZi5lcnJvcjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9KGxldmVsKTtcclxuXHJcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhcnIsZnVuY3Rpb24oaXRlbSl7XHJcbiAgICBpZih1dGlsLmlzU3RyaW5nKGl0ZW0pKXtcclxuICAgICAgZm5zLnB1c2goZm4uYmluZChzZWxmLGl0ZW0sc3R5bGUpKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBmbnMucHVzaChmbi5iaW5kKHNlbGYsaXRlbSkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHByaW50T25Db25zb2xlKGZucyk7XHJcbn1cclxuXHJcbnZhciBwcmludE9uQ29uc29sZSA9IGZ1bmN0aW9uKGZucyl7XHJcbiAgby5ncm91cCgpO1xyXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZm5zLGZ1bmN0aW9uKGZuKXtcclxuICAgIGZuKCk7XHJcbiAgfSk7XHJcblxyXG4gIG8ubG9nKG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKSk7XHJcbiAgby5ncm91cEVuZCgpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGxvZyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwubG9nKTtcclxuICAgIH0sXHJcbiAgICBpbmZvIDogZnVuY3Rpb24oKXtcclxuICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwuaW5mbyk7XHJcbiAgICB9LFxyXG4gICAgd2FybiA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxvZy5jYWxsKG8sYXJndW1lbnRzLGxvZ0xldmVsLndhcm4pO1xyXG4gICAgfSxcclxuICAgIGVycm9yIDogZnVuY3Rpb24oKXtcclxuICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwuZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHV0aWw6bmV3IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm57XHJcbiAgICAgIGlzVW5kZWZpbmVkOmZ1bmN0aW9uKGFyZyl7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGlzTnVtYmVyOmZ1bmN0aW9uKGFyZyl7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihhcmcpO1xyXG4gICAgICB9LFxyXG4gICAgICBpc0Jvb2xlYW46ZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJib29sZWFuXCI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGlzU3RyaW5nOmZ1bmN0aW9uKGFyZyl7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCI7XHJcbiAgICAgIH0sXHJcbiAgICAgIGlzRnVuY3Rpb246ZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgICB9LFxyXG4gICAgICBpc0FycmF5OmZ1bmN0aW9uKGFyZyl7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
