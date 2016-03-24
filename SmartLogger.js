(function (exports) {
  var styles = {
    log:{color: yellow; font-style: italic; background-color: blue;padding: 2px},
    warn:{color: yellow; font-style: italic; background-color: blue;padding: 2px},
    info:{color: white; font-style: italic; background-color: blue;padding: 2px},
    error:{color: white; font-style: italic; background-color: red;padding: 2px}
  }

  var o = console;

  var log = function(args){
    args.push(styles.log);
    this.log.apply(this,args);
  }

  var warn = function(args){
    args.push(styles.warn);
    this.warn.apply(this,args);
  }

  var info = function(args){
    args.push(styles.info);
    this.info.apply(this,args);
  }

  var error = function(args){
    args.push(styles.error);
    this.error.apply(this,args);
  }

  exports.log = function () {
          log.apply(o,arguments);
        };
  exports.warn = function () {
        warn.apply(o,arguments);
        };
  exports.info = function () {
        info.apply(o,arguments);
        };
  exports.error = function () {
        error.apply(o,arguments);
        };
})(typeof exports === "undefined"?this['SmartLogger']={}:exports);
