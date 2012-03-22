/*!
  * aspectos.js - copyright Lawrence Carvalho 2011
  *
  * License MIT (c) Lawrence Carvalho 2012
  * special thanks to:
  * Mum (Hi Mum!)
  *
  */
!function(name, context, definition) {
  if (typeof module !== 'undefined') module.exports = definition(name, context);
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else context[name] = definition(name, context);
}('aspectos', this, function(name, context) {
    return function() {
        var isFunction = function(fn) {
            return (typeof fn === 'function');
        };
        // before
        var before = function(target,method,fn) {
            var origMethod = isFunction(method) ? method : target[method];

            return function() {
                fn.apply(target || this, arguments);
                return origMethod.apply(target || this, arguments);
            };
        };
        //after
        var after = function(target,method,fn) {
            var origMethod = isFunction(method) ? method : target[method];
            return function() {
                var rv = origMethod.apply(target || this, arguments);
                return fn.apply(target || this, arguments);
            };
        };
        //around
        var around = function(target,method,aFn) {
            var origMethod = isFunction(method) ? method : target[method];
            return function(args) {
                if (aFn && aFn.length === 2) {
                    aFn[0].apply(target || this, arguments);
                    var rv = origMethod.apply(target || this, arguments);
                    return aFn[1].apply(target || this, arguments);
                }
                else {
                    return origMethod.apply(target || this, arguments);
                }
            };
        };
        return {
            before: before,
            after: after,
            around: around
        };
    }();
});
