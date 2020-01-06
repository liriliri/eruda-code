// Built by eustia.
'use strict'

var _ = {}

/* ------------------------------ allKeys ------------------------------ */

export var allKeys = (_.allKeys = (function() {
  /* Retrieve all the names of object's own and inherited properties.
   *
   * |Name  |Type  |Desc                       |
   * |------|------|---------------------------|
   * |obj   |object|Object to query            |
   * |return|array |Array of all property names|
   *
   * > Members of Object's prototype won't be retrieved.
   *
   * ```javascript
   * var obj = Object.create({zero: 0});
   * obj.one = 1;
   * allKeys(obj) // -> ['zero', 'one']
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  function exports(obj) {
    var ret = [],
      key

    for (key in obj) ret.push(key)

    return ret
  }

  return exports
})())

/* ------------------------------ noop ------------------------------ */

export var noop = (_.noop = (function() {
  /* A no-operation function.
   *
   * ```javascript
   * noop(); // Does nothing
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  function exports() {}

  return exports
})())

/* ------------------------------ isUndef ------------------------------ */

export var isUndef = (_.isUndef = (function() {
  /* Check if value is undefined.
   *
   * |Name  |Type   |Desc                      |
   * |------|-------|--------------------------|
   * |val   |*      |Value to check            |
   * |return|boolean|True if value is undefined|
   *
   * ```javascript
   * isUndef(void 0); // -> true
   * isUndef(null); // -> false
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  function exports(val) {
    return val === void 0
  }

  return exports
})())

/* ------------------------------ optimizeCb ------------------------------ */

export var optimizeCb = (_.optimizeCb = (function() {
  /* Used for function context binding.
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * isUndef
   */

  function exports(fn, ctx, argCount) {
    if (isUndef(ctx)) return fn

    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function(val) {
          return fn.call(ctx, val)
        }
      case 3:
        return function(val, idx, collection) {
          return fn.call(ctx, val, idx, collection)
        }
      case 4:
        return function(accumulator, val, idx, collection) {
          return fn.call(ctx, accumulator, val, idx, collection)
        }
    }

    return function() {
      return fn.apply(ctx, arguments)
    }
  }

  return exports
})())

/* ------------------------------ has ------------------------------ */

export var has = (_.has = (function() {
  /* Checks if key is a direct property.
   *
   * |Name  |Type   |Desc                            |
   * |------|-------|--------------------------------|
   * |obj   |object |Object to query                 |
   * |key   |string |Path to check                   |
   * |return|boolean|True if key is a direct property|
   *
   * ```javascript
   * has({one: 1}, 'one'); // -> true
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  var hasOwnProp = Object.prototype.hasOwnProperty

  function exports(obj, key) {
    return hasOwnProp.call(obj, key)
  }

  return exports
})())

/* ------------------------------ keys ------------------------------ */

export var keys = (_.keys = (function(exports) {
  /* Create an array of the own enumerable property names of object.
   *
   * |Name  |Type  |Desc                   |
   * |------|------|-----------------------|
   * |obj   |object|Object to query        |
   * |return|array |Array of property names|
   *
   * ```javascript
   * keys({a: 1}); // -> ['a']
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * has
   */

  exports =
    Object.keys ||
    function(obj) {
      var ret = [],
        key

      for (key in obj) {
        if (has(obj, key)) ret.push(key)
      }

      return ret
    }

  return exports
})({}))

/* ------------------------------ objToStr ------------------------------ */

export var objToStr = (_.objToStr = (function() {
  /* Alias of Object.prototype.toString.
   *
   * |Name  |Type  |Desc                                |
   * |------|------|------------------------------------|
   * |value |*     |Source value                        |
   * |return|string|String representation of given value|
   *
   * ```javascript
   * objToStr(5); // -> '[object Number]'
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  var ObjToStr = Object.prototype.toString

  function exports(val) {
    return ObjToStr.call(val)
  }

  return exports
})())

/* ------------------------------ isFn ------------------------------ */

export var isFn = (_.isFn = (function() {
  /* Check if value is a function.
   *
   * |Name  |Type   |Desc                       |
   * |------|-------|---------------------------|
   * |val   |*      |Value to check             |
   * |return|boolean|True if value is a function|
   *
   * Generator function is also classified as true.
   *
   * ```javascript
   * isFn(function() {}); // -> true
   * isFn(function*() {}); // -> true
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * objToStr
   */

  function exports(val) {
    var objStr = objToStr(val)

    return (
      objStr === '[object Function]' || objStr === '[object GeneratorFunction]'
    )
  }

  return exports
})())

/* ------------------------------ isNum ------------------------------ */

export var isNum = (_.isNum = (function() {
  /* Check if value is classified as a Number primitive or object.
   *
   * |Name  |Type   |Desc                                 |
   * |------|-------|-------------------------------------|
   * |value |*      |Value to check                       |
   * |return|boolean|True if value is correctly classified|
   *
   * ```javascript
   * isNum(5); // -> true
   * isNum(5.1); // -> true
   * isNum({}); // -> false
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * objToStr
   */

  function exports(val) {
    return objToStr(val) === '[object Number]'
  }

  return exports
})())

/* ------------------------------ isArrLike ------------------------------ */

export var isArrLike = (_.isArrLike = (function() {
  /* Check if value is array-like.
   *
   * |Name  |Type   |Desc                       |
   * |------|-------|---------------------------|
   * |value |*      |Value to check             |
   * |return|boolean|True if value is array like|
   *
   * > Function returns false.
   *
   * ```javascript
   * isArrLike('test'); // -> true
   * isArrLike(document.body.children); // -> true;
   * isArrLike([1, 2, 3]); // -> true
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * isNum isFn
   */

  var MAX_ARR_IDX = Math.pow(2, 53) - 1

  function exports(val) {
    if (!val) return false

    var len = val.length

    return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val)
  }

  return exports
})())

/* ------------------------------ each ------------------------------ */

export var each = (_.each = (function() {
  /* Iterate over elements of collection and invokes iteratee for each element.
   *
   * |Name    |Type        |Desc                          |
   * |--------|------------|------------------------------|
   * |obj     |object array|Collection to iterate over    |
   * |iteratee|function    |Function invoked per iteration|
   * |[ctx]   |*           |Function context              |
   *
   * ```javascript
   * each({'a': 1, 'b': 2}, function (val, key) {});
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * isArrLike keys optimizeCb
   */

  function exports(obj, iteratee, ctx) {
    iteratee = optimizeCb(iteratee, ctx)

    var i, len

    if (isArrLike(obj)) {
      for (i = 0, len = obj.length; i < len; i++) iteratee(obj[i], i, obj)
    } else {
      var _keys = keys(obj)
      for (i = 0, len = _keys.length; i < len; i++) {
        iteratee(obj[_keys[i]], _keys[i], obj)
      }
    }

    return obj
  }

  return exports
})())

/* ------------------------------ createAssigner ------------------------------ */

export var createAssigner = (_.createAssigner = (function() {
  /* Used to create extend, extendOwn and defaults.
   *
   * |Name    |Type    |Desc                          |
   * |--------|--------|------------------------------|
   * |keysFn  |function|Function to get object keys   |
   * |defaults|boolean |No override when set to true  |
   * |return  |function|Result function, extend...    |
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * isUndef each
   */

  function exports(keysFn, defaults) {
    return function(obj) {
      each(arguments, function(src, idx) {
        if (idx === 0) return

        var keys = keysFn(src)

        each(keys, function(key) {
          if (!defaults || isUndef(obj[key])) obj[key] = src[key]
        })
      })

      return obj
    }
  }

  return exports
})())

/* ------------------------------ extend ------------------------------ */

export var extend = (_.extend = (function(exports) {
  /* Copy all of the properties in the source objects over to the destination object.
   *
   * |Name  |Type  |Desc              |
   * |------|------|------------------|
   * |obj   |object|Destination object|
   * |...src|object|Sources objects   |
   * |return|object|Destination object|
   *
   * ```javascript
   * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  /* dependencies
   * createAssigner allKeys
   */

  exports = createAssigner(allKeys)

  return exports
})({}))

/* ------------------------------ copy ------------------------------ */

export var copy = (_.copy = (function() {
  /* Copy text to clipboard using document.execCommand.
   *
   * |Name|Type    |Desc             |
   * |----|--------|-----------------|
   * |text|string  |Text to copy     |
   * |[cb]|function|Optional callback|
   *
   * ```javascript
   * copy('text', function (err)
   * {
   *     // Handle errors.
   * });
   * ```
   */

  /* module
   * env: browser
   * test: browser
   */

  /* dependencies
   * extend noop
   */

  function exports(text, cb) {
    cb = cb || noop

    var el = document.createElement('textarea'),
      body = document.body

    extend(el.style, {
      fontSize: '12pt',
      border: '0',
      padding: '0',
      margin: '0',
      position: 'absolute',
      left: '-9999px'
    })

    el.value = text

    body.appendChild(el)

    // Prevent showing ios keyboard.
    el.setAttribute('readonly', '')
    el.select()
    el.setSelectionRange(0, text.length)

    try {
      document.execCommand('copy')
      cb()
    } catch (e) {
      cb(e)
    } finally {
      body.removeChild(el)
    }
  }

  return exports
})())

/* ------------------------------ nextTick ------------------------------ */

export var nextTick = (_.nextTick = (function(exports) {
  /* Next tick for both node and browser.
   *
   * |Name|Type    |Desc            |
   * |----|--------|----------------|
   * |cb  |function|Function to call|
   *
   * Use process.nextTick if available.
   *
   * Otherwise setImmediate or setTimeout is used as fallback.
   *
   * ```javascript
   * nextTick(function ()
   * {
   *     // Do something...
   * });
   * ```
   */

  /* module
   * env: all
   * test: all
   */

  if (typeof process === 'object' && process.nextTick) {
    exports = process.nextTick
  } else if (typeof setImmediate === 'function') {
    exports = function(cb) {
      setImmediate(ensureCallable(cb))
    }
  } else {
    exports = function(cb) {
      setTimeout(ensureCallable(cb), 0)
    }
  }

  function ensureCallable(fn) {
    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function')

    return fn
  }

  return exports
})({}))

export default _
