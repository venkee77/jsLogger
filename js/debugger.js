(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SmartLogger = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports =
 {
        log:"color: black; font-style: italic; background-color: white;padding: 2px",
        warn:"color: yellow; font-style: italic; background-color: blue;padding: 2px",
        info:"color: white; font-style: italic; background-color: blue;padding: 2px",
        error:"color: yellow; font-style: italic; background-color: red;padding: 2px"
}

},{}],2:[function(require,module,exports){
"use strict";
var styles = require("./decorator.js");

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

},{"./decorator.js":1}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9kZWNvcmF0b3IuanMiLCJqcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID1cbiB7XG4gICAgICAgIGxvZzpcImNvbG9yOiBibGFjazsgZm9udC1zdHlsZTogaXRhbGljOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtwYWRkaW5nOiAycHhcIixcbiAgICAgICAgd2FybjpcImNvbG9yOiB5ZWxsb3c7IGZvbnQtc3R5bGU6IGl0YWxpYzsgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtwYWRkaW5nOiAycHhcIixcbiAgICAgICAgaW5mbzpcImNvbG9yOiB3aGl0ZTsgZm9udC1zdHlsZTogaXRhbGljOyBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO3BhZGRpbmc6IDJweFwiLFxuICAgICAgICBlcnJvcjpcImNvbG9yOiB5ZWxsb3c7IGZvbnQtc3R5bGU6IGl0YWxpYzsgYmFja2dyb3VuZC1jb2xvcjogcmVkO3BhZGRpbmc6IDJweFwiXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBzdHlsZXMgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3IuanNcIik7XG5cbnZhciBvID0gY29uc29sZTtcbnZhciBzdHlsZUZvcm1hdHRlciA9IFwiJWNcIjtcblxudmFyIGNvbnRhaW5zRm9ybWF0dGVyID0gZnVuY3Rpb24oZm9ybWF0KXtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZihmb3JtYXQpID49IDA7XG59XG5cbnZhciBhcHBseVN0eWxlRm9ybWF0dGVyID0gZnVuY3Rpb24oKXtcbiAgaWYodGhpcy5sZW5ndGggPT09IDAgKSB7cmV0dXJuIHRoaXM7fVxuICB0aGlzWzBdID0gY29udGFpbnNGb3JtYXR0ZXIuY2FsbCh0aGlzWzBdLHN0eWxlRm9ybWF0dGVyKSA9PT0gZmFsc2U/IHN0eWxlRm9ybWF0dGVyICsgdGhpc1swXTp0aGlzWzBdO1xuICByZXR1cm4gdGhpcztcbn1cblxudmFyIGxvZyA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICB2YXIgYXJyID0gW107XG4gIGFyciA9IGFwcGx5U3R5bGVGb3JtYXR0ZXIuY2FsbChhcmdzKTtcbiAgcHJpbnRPbkNvbnNvbGUodGhpcy5sb2cuYmluZCh0aGlzKSxBcnJheS5wcm90b3R5cGUuam9pbi5jYWxsKGFycixcIiwgXCIpLHN0eWxlcy5sb2cpO1xufVxuXG52YXIgaW5mbyA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICB2YXIgYXJyID0gW107XG4gIGFyciA9IGFwcGx5U3R5bGVGb3JtYXR0ZXIuY2FsbChhcmdzKTtcbiAgcHJpbnRPbkNvbnNvbGUodGhpcy5pbmZvLmJpbmQodGhpcyksQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcnIsXCIsIFwiKSxzdHlsZXMuaW5mbyk7XG59XG5cbnZhciB3YXJuID0gZnVuY3Rpb24oYXJncyl7XG4gIHZhciBhcnIgPSBbXTtcbiAgYXJyID0gYXBwbHlTdHlsZUZvcm1hdHRlci5jYWxsKGFyZ3MpO1xuICBwcmludE9uQ29uc29sZSh0aGlzLndhcm4uYmluZCh0aGlzKSxBcnJheS5wcm90b3R5cGUuam9pbi5jYWxsKGFycixcIiwgXCIpLHN0eWxlcy53YXJuKTtcbn1cblxudmFyIGVycm9yID0gZnVuY3Rpb24oYXJncyl7XG4gIHZhciBhcnIgPSBbXTtcbiAgYXJyID0gYXBwbHlTdHlsZUZvcm1hdHRlci5jYWxsKGFyZ3MpO1xuICBwcmludE9uQ29uc29sZSh0aGlzLmVycm9yLmJpbmQodGhpcyksQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcnIsXCIsIFwiKSxzdHlsZXMuZXJyb3IpO1xufVxuXG52YXIgcHJpbnRPbkNvbnNvbGUgPSBmdW5jdGlvbihmbixhcmcxLGFyZzIpe1xuXG4gIGlmKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuICBvLmdyb3VwKCk7XG4gIGZuKGFyZzEsYXJnMik7XG4gIG8ubG9nKG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKSk7XG4gIG8uZ3JvdXBFbmQoKTtcbn1cblxudmFyIGJpbmRBcmdzVG9BcnJheSA9IGZ1bmN0aW9uKGFyZ3Mpe1xuICBpZih0eXBlb2YgYXJncyA9PT0gXCJhcnJheVwiKXtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGFyZ3MsZnVuY3Rpb24oaXRlbSl7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfWVsc2UgaWYodHlwZW9mIGFyZ3MgPT09IFwib2JqZWN0XCIpe1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICBhcnIucHVzaChhcmdzKTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgbG9nIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsb2cuYXBwbHkobyxiaW5kQXJnc1RvQXJyYXkoYXJndW1lbnRzKSk7XG4gICAgICB9LFxuICAgICAgaW5mbyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaW5mby5hcHBseShvLGJpbmRBcmdzVG9BcnJheShhcmd1bWVudHMpKTtcbiAgICAgIH0sXG4gICAgICB3YXJuIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB3YXJuLmFwcGx5KG8sYmluZEFyZ3NUb0FycmF5KGFyZ3VtZW50cykpO1xuICAgICAgfSxcbiAgICAgIGVycm9yIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBlcnJvci5hcHBseShvLGJpbmRBcmdzVG9BcnJheShhcmd1bWVudHMpKTtcbiAgICAgIH1cbiAgICB9XG4iXX0=
