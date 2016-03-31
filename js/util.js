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
