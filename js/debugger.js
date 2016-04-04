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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9kZWNvcmF0b3IuanMiLCJqcy9lbnVtLmpzIiwianMvbWFpbi5qcyIsImpzL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID1cbiB7XG4gICBzdHlsZXM6e1xuICAgICAgICBsb2c6XCJjb2xvcjogYmxhY2s7IGZvbnQtc3R5bGU6IGl0YWxpYzsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7cGFkZGluZzogMnB4XCIsXG4gICAgICAgIHdhcm46XCJjb2xvcjogYmx1ZTsgZm9udC1zdHlsZTogaXRhbGljOyBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7cGFkZGluZzogMnB4XCIsXG4gICAgICAgIGluZm86XCJjb2xvcjogd2hpdGU7IGZvbnQtc3R5bGU6IGl0YWxpYzsgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtwYWRkaW5nOiAycHhcIixcbiAgICAgICAgZXJyb3I6XCJjb2xvcjogeWVsbG93OyBmb250LXN0eWxlOiBpdGFsaWM7IGJhY2tncm91bmQtY29sb3I6IHJlZDtwYWRkaW5nOiAycHhcIlxuICAgICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIExvZ0xldmVsOntcbiAgICBsb2c6XCJsb2dcIixcbiAgICB3YXJuOlwid2FyblwiLFxuICAgIGluZm86XCJpbmZvXCIsXG4gICAgZXJyb3I6XCJlcnJvclwiXG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHN0eWxlcyA9IHJlcXVpcmUoXCIuL2RlY29yYXRvci5qc1wiKS5zdHlsZXM7XG52YXIgbG9nTGV2ZWwgPSByZXF1aXJlKFwiLi9lbnVtLmpzXCIpLkxvZ0xldmVsO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpLnV0aWw7XG5cbnZhciBvID0gY29uc29sZTtcbnZhciBzdHlsZUZvcm1hdHRlciA9IFwiJWNcIjtcblxudmFyIF9kZWZhdWx0cyA9IHtcbiAgc3R5bGU6c3R5bGVzLmxvZyxcbiAgZnVuYzpvLmxvZ1xufVxuXG52YXIgY29udGFpbnNGb3JtYXR0ZXIgPSBmdW5jdGlvbihhcmcsZm9ybWF0KXtcbiAgICB0cnl7XG4gICAgICByZXR1cm4gYXJnLmluZGV4T2YoZm9ybWF0KSA+PSAwO1xuICAgIH1jYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbnZhciBhcHBseVN0eWxlRm9ybWF0dGVyID0gZnVuY3Rpb24oYXJnKXtcbiAgcmV0dXJuIGNvbnRhaW5zRm9ybWF0dGVyKGFyZyxzdHlsZUZvcm1hdHRlcikgPT09IGZhbHNlPyBzdHlsZUZvcm1hdHRlciArIGFyZzphcmc7XG59XG5cbnZhciBsb2cgPSBmdW5jdGlvbihhcmdzLGxldmVsKXtcbiAgdmFyIGZucyA9IFtdOyB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBmbiA9IF9kZWZhdWx0cy5mdW5jO1xuICB2YXIgc3R5bGUgPSBzdHlsZXNbbGV2ZWxdO1xuXG4gIHZhciBhcnIgPSAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGFyZ3MsZnVuY3Rpb24oaXRlbSl7XG4gICAgaWYodXRpbC5pc1N0cmluZyhpdGVtKSB8fCB1dGlsLmlzQm9vbGVhbihpdGVtKSB8fCB1dGlsLmlzTnVtYmVyKGl0ZW0pKXtcbiAgICAgIHJldHVybiBhcHBseVN0eWxlRm9ybWF0dGVyKGl0ZW0udG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gIH0pO1xuXG4gIGZuID0gc2VsZltsZXZlbF07XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXJyLGZ1bmN0aW9uKGl0ZW0pe1xuICAgIGlmKHV0aWwuaXNTdHJpbmcoaXRlbSkpe1xuICAgICAgZm5zLnB1c2goZm4uYmluZChzZWxmLGl0ZW0sc3R5bGUpKTtcbiAgICB9ZWxzZXtcbiAgICAgIGZucy5wdXNoKGZuLmJpbmQoc2VsZixpdGVtKSk7XG4gICAgfVxuICB9KTtcbiAgcHJpbnRPbkNvbnNvbGUoZm5zKTtcbn1cblxudmFyIHByaW50T25Db25zb2xlID0gZnVuY3Rpb24oZm5zKXtcbiAgby5ncm91cCgpO1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGZucyxmdW5jdGlvbihmbil7XG4gICAgZm4oKTtcbiAgfSk7XG5cbiAgby5sb2cobmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpKTtcbiAgby5ncm91cEVuZCgpO1xufVxuXG52YXIgc2V0Q29uZmlnID0gZnVuY3Rpb24ob2JqKXtcbiAgaWYoJ3N0eWxlcycgaW4gb2JqKXtcbiAgICB2YXIgcyA9IG9ialsnc3R5bGVzJ107XG4gICAgaWYoJ2xvZycgaW4gcyl7XG4gICAgICBfZGVmYXVsdHMuc3R5bGUgPSBzdHlsZXMubG9nID0gc1snbG9nJ107XG4gICAgfVxuICAgIGlmKCdpbmZvJyBpbiBzKXtcbiAgICAgIHN0eWxlcy5pbmZvID0gc1snaW5mbyddO1xuICAgIH1cbiAgICBpZignd2FybicgaW4gcyl7XG4gICAgICBzdHlsZXMud2FybiA9IHNbJ3dhcm4nXTtcbiAgICB9XG4gICAgaWYoJ2Vycm9yJyBpbiBzKXtcbiAgICAgIHN0eWxlcy5lcnJvciA9IHNbJ2Vycm9yJ107XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6ZnVuY3Rpb24ob2JqKXtcbiAgICAgIHNldENvbmZpZyhvYmopO1xuICAgIH0sXG4gICAgbG9nIDogZnVuY3Rpb24oKXtcbiAgICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwubG9nKTtcbiAgICB9LFxuICAgIGluZm8gOiBmdW5jdGlvbigpe1xuICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwuaW5mbyk7XG4gICAgfSxcbiAgICB3YXJuIDogZnVuY3Rpb24oKXtcbiAgICAgIGxvZy5jYWxsKG8sYXJndW1lbnRzLGxvZ0xldmVsLndhcm4pO1xuICAgIH0sXG4gICAgZXJyb3IgOiBmdW5jdGlvbigpe1xuICAgICAgbG9nLmNhbGwobyxhcmd1bWVudHMsbG9nTGV2ZWwuZXJyb3IpO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB1dGlsOm5ldyBmdW5jdGlvbigpe1xuICAgIHJldHVybntcbiAgICAgIGlzVW5kZWZpbmVkOmZ1bmN0aW9uKGFyZyl7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSBcInVuZGVmaW5lZFwiO1xuICAgICAgfSxcbiAgICAgIGlzTnVtYmVyOmZ1bmN0aW9uKGFyZyl7XG4gICAgICAgIHJldHVybiAhaXNOYU4oYXJnKTtcbiAgICAgIH0sXG4gICAgICBpc0Jvb2xlYW46ZnVuY3Rpb24oYXJnKXtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09IFwiYm9vbGVhblwiO1xuICAgICAgfSxcbiAgICAgIGlzU3RyaW5nOmZ1bmN0aW9uKGFyZyl7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiO1xuICAgICAgfSxcbiAgICAgIGlzRnVuY3Rpb246ZnVuY3Rpb24oYXJnKXtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgIH0sXG4gICAgICBpc0FycmF5OmZ1bmN0aW9uKGFyZyl7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGFyZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=
