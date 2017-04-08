(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var choo = require('choo');
var css = 0;(null || true) && require('scopedify/scope')("_scope_2f33308f");(null || true) && require('scopedify/scope')("_scope_9d89a1b2");
require('./view/partials');

var app = choo();

app.use(require('./src/reducer/loader'));
app.use(require('./src/reducer/page'));

app.route('/', require('./view/index'));
app.route('/contact', require('./view/contact'));
app.route('/page/*', require('./view/page'));
app.route('/404', require('./view/404'));

app.mount('body');

},{"./src/reducer/loader":36,"./src/reducer/page":37,"./view/404":40,"./view/contact":48,"./view/index":50,"./view/page":52,"./view/partials":53,"choo":6,"insert-css":15,"scopedify/scope":25}],2:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":28}],3:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":11,"hyperx":14,"on-load":23}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
module.exports = require('bel')

},{"bel":3}],6:[function(require,module,exports){
var documentReady = require('document-ready')
var nanorouter = require('nanorouter')
var nanomount = require('nanomount')
var nanomorph = require('nanomorph')
var nanoraf = require('nanoraf')
var nanobus = require('nanobus')
var assert = require('assert')

var onHistoryChange = require('./lib/history')
var onHref = require('./lib/href')

module.exports = Framework

function Framework (opts) {
  opts = opts || {}

  var routerOpts = {
    default: opts.defaultRoute || '/404',
    curry: true
  }

  var timingEnabled = opts.timing === undefined ? true : opts.timing
  var hasWindow = typeof window !== 'undefined'
  var hasPerformance = hasWindow && window.performance && window.performance.mark
  var router = nanorouter(routerOpts)
  var bus = nanobus()
  var rerender = null
  var tree = null
  var state = {}

  return {
    toString: toString,
    use: register,
    mount: mount,
    route: route,
    start: start
  }

  function route (route, handler) {
    router.on(route, function (params) {
      return function () {
        state.params = params
        return handler(state, emit)
      }
    })
  }

  function register (cb) {
    cb(state, bus)
  }

  function start () {
    tree = router(createLocation())
    rerender = nanoraf(function () {
      if (hasPerformance && timingEnabled) {
        window.performance.mark('choo:renderStart')
      }
      var newTree = router(createLocation())
      tree = nanomorph(tree, newTree)
      if (hasPerformance && timingEnabled) {
        window.performance.mark('choo:renderEnd')
        window.performance.measure('choo:render', 'choo:renderStart', 'choo:renderEnd')
      }
    })

    bus.on('render', rerender)

    if (opts.history !== false) {
      onHistoryChange(function (href) {
        bus.emit('pushState')
      })

      bus.on('pushState', function (href) {
        if (href) window.history.pushState({}, null, href)
        bus.emit('render')
        setTimeout(function () {
          scrollIntoView()
        }, 0)
      })

      if (opts.href !== false) {
        onHref(function (location) {
          var href = location.href
          var currHref = window.location.href
          if (href === currHref) return
          bus.emit('pushState', href)
        })
      }
    }

    documentReady(function () {
      bus.emit('DOMContentLoaded')
    })

    return tree
  }

  function emit (eventName, data) {
    bus.emit(eventName, data)
  }

  function mount (selector) {
    var newTree = start()
    documentReady(function () {
      var root = document.querySelector(selector)
      assert.ok(root, 'could not query selector: ' + selector)
      nanomount(root, newTree)
      tree = root
    })
  }

  function toString (location, _state) {
    state = _state || {}
    var html = router(location)
    assert.equal()
    return html.toString()
  }
}

function scrollIntoView () {
  var hash = window.location.hash
  if (hash) {
    try {
      var el = document.querySelector(hash)
      if (el) el.scrollIntoView(true)
    } catch (e) {}
  }
}

function createLocation () {
  var pathname = window.location.pathname.replace(/\/$/, '')
  var hash = window.location.hash.replace(/^#/, '/')
  return pathname + hash
}

},{"./lib/history":7,"./lib/href":8,"assert":2,"document-ready":9,"nanobus":16,"nanomorph":17,"nanomount":20,"nanoraf":21,"nanorouter":22}],7:[function(require,module,exports){
var assert = require('assert')

module.exports = history

// listen to html5 pushstate events
// and update router accordingly
// fn(str) -> null
function history (cb) {
  assert.equal(typeof cb, 'function', 'sheet-router/history: cb must be a function')
  window.onpopstate = function () {
    cb({
      pathname: document.location.pathname,
      search: document.location.search,
      href: document.location.href,
      hash: document.location.hash
    })
  }
}

},{"assert":2}],8:[function(require,module,exports){
var assert = require('assert')

module.exports = href

var noRoutingAttrName = 'data-no-routing'

// handle a click if is anchor tag with an href
// and url lives on the same domain. Replaces
// trailing '#' so empty links work as expected.
// (fn(str), obj?) -> undefined
function href (cb, root) {
  assert.equal(typeof cb, 'function', 'sheet-router/href: cb must be a function')

  window.onclick = function (e) {
    if ((e.button && e.button !== 0) || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return

    var node = (function traverse (node) {
      if (!node || node === root) return
      if (node.localName !== 'a') return traverse(node.parentNode)
      if (node.href === undefined) return traverse(node.parentNode)
      if (window.location.host !== node.host) return traverse(node.parentNode)
      return node
    })(e.target)

    if (!node) return

    var isRoutingDisabled = node.hasAttribute(noRoutingAttrName)
    if (isRoutingDisabled) return

    e.preventDefault()
    cb(node)
  }
}

},{"assert":2}],9:[function(require,module,exports){
'use strict'

var assert = require('assert')

module.exports = ready

function ready (callback) {
  assert.notEqual(typeof document, 'undefined', 'document-ready only runs in the browser')
  var state = document.readyState
  if (state === 'complete' || state === 'interactive') {
    return setTimeout(callback, 0)
  }

  document.addEventListener('DOMContentLoaded', function onLoad () {
    callback()
  })
}

},{"assert":2}],10:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],11:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":4}],12:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],14:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":13}],15:[function(require,module,exports){
var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

module.exports = insertCss;
module.exports.insertCss = insertCss;

},{}],16:[function(require,module,exports){
var assert = require('assert')

module.exports = Nanobus

function Nanobus () {
  if (!(this instanceof Nanobus)) return new Nanobus()
  this._starListeners = []
  this._listeners = {}
}

Nanobus.prototype.emit = function (eventName, data) {
  assert.equal(typeof eventName, 'string', 'nanobus.emit: eventName should be type string')

  var listeners = this._listeners[eventName]
  if (listeners && listeners.length) this._emit(listeners, data)

  if (this._starListeners.length) {
    this._emit(this._starListeners, eventName, data)
  }

  return this
}

Nanobus.prototype.on = Nanobus.prototype.addListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.on: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.on: listener should be type function')

  if (eventName === '*') {
    this._starListeners.push(listener)
  } else {
    if (!this._listeners[eventName]) this._listeners[eventName] = []
    this._listeners[eventName].push(listener)
  }
  return this
}

Nanobus.prototype.once = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.once: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.once: listener should be type function')

  this.on(eventName, once)
  var self = this
  function once () {
    listener.apply(self, arguments)
    self.removeListener(eventName, once)
  }
  return this
}

Nanobus.prototype.removeListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.removeListener: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.removeListener: listener should be type function')

  if (eventName === '*') {
    if (remove(this._starListeners, listener)) return this
  } else {
    if (remove(this._listeners[eventName], listener)) return this
  }

  function remove (arr, listener) {
    if (!arr) return
    var index = arr.indexOf(listener)
    if (index !== -1) {
      arr.splice(index, 1)
      return true
    }
  }
}

Nanobus.prototype.removeAllListeners = function (eventName) {
  if (eventName) {
    if (eventName === '*') {
      this._starListeners = []
    } else {
      this._listeners[eventName] = []
    }
  } else {
    this._starListeners = []
    this._listeners = {}
  }
  return this
}

Nanobus.prototype.listeners = function (eventName) {
  var listeners = this._listeners[eventName]
  var ret = []
  if (listeners) {
    var ilength = listeners.length
    for (var i = 0; i < ilength; i++) ret.push(listeners[i])
  }
  return ret
}

Nanobus.prototype._emit = function (arr, eventName, data) {
  if (!data) {
    data = eventName
    eventName = null
  }
  var length = arr.length
  for (var i = 0; i < length; i++) {
    var listener = arr[i]
    if (eventName) listener(eventName, data)
    else listener(data)
  }
}

},{"assert":2}],17:[function(require,module,exports){
var assert = require('assert')
var morph = require('./lib/morph')

module.exports = nanomorph

// morph one tree into another tree
// (obj, obj) -> obj
// no parent
//   -> same: diff and walk children
//   -> not same: replace and return
// old node doesn't exist
//   -> insert new node
// new node doesn't exist
//   -> delete old node
// nodes are not the same
//   -> diff nodes and apply patch to old node
// nodes are the same
//   -> walk all child nodes and append to old node
function nanomorph (oldTree, newTree) {
  assert.equal(typeof oldTree, 'object', 'nanomorph: oldTree should be an object')
  assert.equal(typeof newTree, 'object', 'nanomorph: newTree should be an object')
  var tree = walk(newTree, oldTree)
  return tree
}

// walk and morph a dom tree
// (obj, obj) -> obj
function walk (newNode, oldNode) {
  if (!oldNode) {
    return newNode
  } else if (!newNode) {
    return null
  } else if (newNode.isSameNode && newNode.isSameNode(oldNode)) {
    return oldNode
  } else if (newNode.tagName !== oldNode.tagName) {
    return newNode
  } else {
    morph(newNode, oldNode)
    updateChildren(newNode, oldNode)
    return oldNode
  }
}

// update the children of elements
// (obj, obj) -> null
function updateChildren (newNode, oldNode) {
  if (!newNode.childNodes || !oldNode.childNodes) return

  var newLength = newNode.childNodes.length
  var oldLength = oldNode.childNodes.length
  var length = Math.max(oldLength, newLength)

  var iNew = 0
  var iOld = 0
  for (var i = 0; i < length; i++, iNew++, iOld++) {
    var newChildNode = newNode.childNodes[iNew]
    var oldChildNode = oldNode.childNodes[iOld]
    var retChildNode = walk(newChildNode, oldChildNode)
    if (!retChildNode) {
      if (oldChildNode) {
        oldNode.removeChild(oldChildNode)
        iOld--
      }
    } else if (!oldChildNode) {
      if (retChildNode) {
        oldNode.appendChild(retChildNode)
        iNew--
      }
    } else if (retChildNode !== oldChildNode) {
      oldNode.replaceChild(retChildNode, oldChildNode)
      iNew--
    }
  }
}

},{"./lib/morph":19,"assert":2}],18:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],19:[function(require,module,exports){
var events = require('./events')
var eventsLength = events.length

var ELEMENT_NODE = 1
var TEXT_NODE = 3
var COMMENT_NODE = 8

module.exports = morph

// diff elements and apply the resulting patch to the old node
// (obj, obj) -> null
function morph (newNode, oldNode) {
  var nodeType = newNode.nodeType
  var nodeName = newNode.nodeName

  if (nodeType === ELEMENT_NODE) {
    copyAttrs(newNode, oldNode)
  }

  if (nodeType === TEXT_NODE || nodeType === COMMENT_NODE) {
    oldNode.nodeValue = newNode.nodeValue
  }

  // Some DOM nodes are weird
  // https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
  if (nodeName === 'INPUT') updateInput(newNode, oldNode)
  else if (nodeName === 'OPTION') updateOption(newNode, oldNode)
  else if (nodeName === 'TEXTAREA') updateTextarea(newNode, oldNode)
  else if (nodeName === 'SELECT') updateSelect(newNode, oldNode)

  copyEvents(newNode, oldNode)
}

function copyAttrs (newNode, oldNode) {
  var oldAttrs = oldNode.attributes
  var newAttrs = newNode.attributes
  var attrNamespaceURI = null
  var attrValue = null
  var fromValue = null
  var attrName = null
  var attr = null

  for (var i = newAttrs.length - 1; i >= 0; --i) {
    attr = newAttrs[i]
    attrName = attr.name
    attrNamespaceURI = attr.namespaceURI
    attrValue = attr.value

    if (attrNamespaceURI) {
      attrName = attr.localName || attrName
      fromValue = oldNode.getAttributeNS(attrNamespaceURI, attrName)

      if (fromValue !== attrValue) {
        oldNode.setAttributeNS(attrNamespaceURI, attrName, attrValue)
      }
    } else {
      fromValue = oldNode.getAttribute(attrName)

      if (fromValue !== attrValue) {
        // apparently values are always cast to strings, ah well
        if (attrValue === 'null' || attrValue === 'undefined') {
          oldNode.removeAttribute(attrName)
        } else {
          oldNode.setAttribute(attrName, attrValue)
        }
      }
    }
  }

  // Remove any extra attributes found on the original DOM element that
  // weren't found on the target element.
  for (var j = oldAttrs.length - 1; j >= 0; --j) {
    attr = oldAttrs[j]
    if (attr.specified !== false) {
      attrName = attr.name
      attrNamespaceURI = attr.namespaceURI

      if (attrNamespaceURI) {
        attrName = attr.localName || attrName
        if (!newNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          oldNode.removeAttributeNS(attrNamespaceURI, attrName)
        }
      } else {
        if (!newNode.hasAttributeNS(null, attrName)) {
          oldNode.removeAttribute(attrName)
        }
      }
    }
  }
}

function copyEvents (newNode, oldNode) {
  for (var i = 0; i < eventsLength; i++) {
    var ev = events[i]
    if (newNode[ev]) {           // if new element has a whitelisted attribute
      oldNode[ev] = newNode[ev]  // update existing element
    } else if (oldNode[ev]) {    // if existing element has it and new one doesnt
      oldNode[ev] = undefined    // remove it from existing element
    }
  }
}

function updateOption (newNode, oldNode) {
  updateAttribute(newNode, oldNode, 'selected')
}

// The "value" attribute is special for the <input> element since it sets the
// initial value. Changing the "value" attribute without changing the "value"
// property will have no effect since it is only used to the set the initial
// value. Similar for the "checked" attribute, and "disabled".
function updateInput (newNode, oldNode) {
  var newValue = newNode.value
  var oldValue = oldNode.value

  updateAttribute(newNode, oldNode, 'checked')
  updateAttribute(newNode, oldNode, 'disabled')

  if (!newNode.hasAttributeNS(null, 'value') || newValue === 'null') {
    oldNode.value = ''
    oldNode.removeAttribute('value')
  } else if (newValue !== oldValue) {
    oldNode.setAttribute('value', newValue)
    oldNode.value = newValue
  } else {
    // this is so elements like slider move their UI thingy
    oldNode.value = newValue
  }
}

function updateTextarea (newNode, oldNode) {
  var newValue = newNode.value
  if (newValue !== oldNode.value) {
    oldNode.value = newValue
  }

  if (oldNode.firstChild) {
    // Needed for IE. Apparently IE sets the placeholder as the
    // node value and vise versa. This ignores an empty update.
    if (newValue === '' && oldNode.firstChild.nodeValue === oldNode.placeholder) {
      return
    }

    oldNode.firstChild.nodeValue = newValue
  }
}

function updateSelect (newNode, oldNode) {
  if (!oldNode.hasAttributeNS(null, 'multiple')) {
    var i = 0
    var curChild = oldNode.firstChild
    while (curChild) {
      var nodeName = curChild.nodeName
      if (nodeName && nodeName.toUpperCase() === 'OPTION') {
        if (curChild.hasAttributeNS(null, 'selected')) break
        i++
      }
      curChild = curChild.nextSibling
    }

    newNode.selectedIndex = i
  }
}

function updateAttribute (newNode, oldNode, name) {
  if (newNode[name] !== oldNode[name]) {
    oldNode[name] = newNode[name]
    if (newNode[name]) {
      oldNode.setAttribute(name, '')
    } else {
      oldNode.removeAttribute(name, '')
    }
  }
}

},{"./events":18}],20:[function(require,module,exports){
var nanomorph = require('nanomorph')
var assert = require('assert')

module.exports = nanomount

function nanomount (target, newTree) {
  if (target.nodeName === 'BODY') {
    var children = target.childNodes
    for (var i = 0; i < children.length; i++) {
      if (children[i].nodeName === 'SCRIPT') {
        newTree.appendChild(children[i].cloneNode(true))
      }
    }
  }

  var tree = nanomorph(target, newTree)
  assert.equal(tree, target, 'nanomount: The target node ' +
    tree.outerHTML.nodeName + ' is not the same type as the new node ' +
    target.outerHTML.nodeName + '.')
}

},{"assert":2,"nanomorph":17}],21:[function(require,module,exports){
'use strict'

var assert = require('assert')

module.exports = nanoraf

// Only call RAF when needed
// (fn, fn?) -> fn
function nanoraf (render, raf) {
  assert.equal(typeof render, 'function', 'nanoraf: render should be a function')
  assert.ok(typeof raf === 'function' || typeof raf === 'undefined', 'nanoraf: raf should be a function or undefined')

  if (!raf) raf = window.requestAnimationFrame
  var redrawScheduled = false
  var args = null

  return function frame () {
    if (args === null && !redrawScheduled) {
      redrawScheduled = true

      raf(function redraw () {
        redrawScheduled = false

        var length = args.length
        var _args = new Array(length)
        for (var i = 0; i < length; i++) _args[i] = args[i]

        render.apply(render, _args)
        args = null
      })
    }

    args = arguments
  }
}

},{"assert":2}],22:[function(require,module,exports){
var wayfarer = require('wayfarer')

var isLocalFile = (/file:\/\//.test(typeof window === 'object' &&
  window.location && window.location.origin)) // electron support

/* eslint-disable no-useless-escape */
var electron = '^(file:\/\/|\/)(.*\.html?\/?)?'
var protocol = '^(http(s)?(:\/\/))?(www\.)?'
var domain = '[a-zA-Z0-9-_\.]+(:[0-9]{1,5})?(\/{1})?'
var qs = '[\?].*$'
/* eslint-enable no-useless-escape */

var stripElectron = new RegExp(electron)
var prefix = new RegExp(protocol + domain)
var normalize = new RegExp('#')
var suffix = new RegExp(qs)

module.exports = Nanorouter

function Nanorouter (opts) {
  opts = opts || {}

  var router = wayfarer(opts.default || '/404')
  var curry = opts.curry || false
  var prevCallback = null
  var prevRoute = null

  emit.on = on
  return emit

  function on (routename, listener) {
    routename = routename.replace(/^[#/]/, '')
    router.on(routename, listener)
  }

  function emit (route) {
    if (!curry) {
      return router(route)
    } else {
      route = pathname(route, isLocalFile)
      if (route === prevRoute) {
        return prevCallback()
      } else {
        prevRoute = route
        prevCallback = router(route)
        return prevCallback()
      }
    }
  }
}

// replace everything in a route but the pathname and hash
function pathname (route, isElectron) {
  if (isElectron) route = route.replace(stripElectron, '')
  else route = route.replace(prefix, '')
  return route.replace(suffix, '').replace(normalize, '/')
}


},{"wayfarer":29}],23:[function(require,module,exports){
'use strict';

/* global MutationObserver */
var document = require('global/document');
var window = require('global/window');
var watch = Object.create(null);
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36);
var KEY_ATTR = 'data-' + KEY_ID;
var INDEX = 0;

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return;
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff);
        continue;
      }
      eachMutation(mutations[i].removedNodes, turnoff);
      eachMutation(mutations[i].addedNodes, turnon);
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  });
}

module.exports = function onload(el, on, off, caller) {
  on = on || function () {};
  off = off || function () {};
  el.setAttribute(KEY_ATTR, 'o' + INDEX);
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller];
  INDEX += 1;
  return el;
};

function turnon(index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el);
    watch[index][2] = 1;
  }
}

function turnoff(index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el);
    watch[index][2] = 0;
  }
}

function eachAttr(mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR);
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue];
    return;
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target);
  }
  if (watch[newValue]) {
    on(newValue, mutation.target);
  }
}

function sameOrigin(oldValue, newValue) {
  if (!oldValue || !newValue) return false;
  return watch[oldValue][3] === watch[newValue][3];
}

function eachMutation(nodes, fn) {
  var keys = Object.keys(watch);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR);
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i]);
        }
      });
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn);
    }
  }
}

},{"global/document":11,"global/window":12}],24:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],25:[function(require,module,exports){
var PREFIX_PREFIX = '_scope_'

module.exports = scope
module.exports.bindPrefix = bindPrefix
module.exports.PREFIX_PREFIX = PREFIX_PREFIX

function bindPrefix (node, prefix, scope) {
  if (node.nodeType === 1) {
    var prefixed = Array.prototype.slice
      .call(node.attributes)
      .map(function (v) { return v.name })
      .filter(function (v) { return RegExp('^' + PREFIX_PREFIX).test(v) })[0]
    if (scope === true ||      // if true, this node is scope root node
      (!scope && !prefixed) || // if true, this node has no prefix
      scope === prefixed) {    // if true, this node already has prefix same as scope root node
      node.setAttribute(prefix, '')
      Array.prototype.slice
        .call(node.childNodes)
        .forEach(function (node) {
          bindPrefix(node, prefix, scope && prefixed)
        })
    }
  }
}

function scope (prefix) {
  return function (node) {
    bindPrefix(node, prefix, true)
    return node
  }
}

},{}],26:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],27:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],28:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":27,"_process":24,"inherits":26}],29:[function(require,module,exports){
var assert = require('assert')
var trie = require('./trie')

module.exports = Wayfarer

// create a router
// str -> obj
function Wayfarer (dft) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(dft)

  var _default = (dft || '').replace(/^\//, '')
  var _trie = trie()

  emit._trie = _trie
  emit.emit = emit
  emit.on = on
  emit._wayfarer = true

  return emit

  // define a route
  // (str, fn) -> obj
  function on (route, cb) {
    assert.equal(typeof route, 'string')
    assert.equal(typeof cb, 'function')

    route = route || '/'

    if (cb && cb._wayfarer && cb._trie) {
      _trie.mount(route, cb._trie.trie)
    } else {
      var node = _trie.create(route)
      node.cb = cb
    }

    return emit
  }

  // match and call a route
  // (str, obj?) -> null
  function emit (route) {
    assert.notEqual(route, undefined, "'route' must be defined")
    var args = new Array(arguments.length)
    for (var i = 1; i < args.length; i++) {
      args[i] = arguments[i]
    }

    var node = _trie.match(route)
    if (node && node.cb) {
      args[0] = node.params
      return node.cb.apply(null, args)
    }

    var dft = _trie.match(_default)
    if (dft && dft.cb) {
      args[0] = dft.params
      return dft.cb.apply(null, args)
    }

    throw new Error("route '" + route + "' did not match")
  }
}

},{"./trie":30,"assert":2}],30:[function(require,module,exports){
var mutate = require('xtend/mutable')
var assert = require('assert')
var xtend = require('xtend')

module.exports = Trie

// create a new trie
// null -> obj
function Trie () {
  if (!(this instanceof Trie)) return new Trie()
  this.trie = { nodes: {} }
}

// create a node on the trie at route
// and return a node
// str -> null
Trie.prototype.create = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')
  // strip leading '/' and split routes
  var routes = route.replace(/^\//, '').split('/')
  return (function createNode (index, trie) {
    var thisRoute = routes[index]

    if (thisRoute === undefined) return trie

    var node = null
    if (/^:|^\*/.test(thisRoute)) {
      // if node is a name match, set name and append to ':' node
      if (!trie.nodes['$$']) {
        node = { nodes: {} }
        trie.nodes['$$'] = node
      } else {
        node = trie.nodes['$$']
      }

      if (thisRoute[0] === '*') {
        trie.wildcard = true
      }

      trie.name = thisRoute.replace(/^:|^\*/, '')
    } else if (!trie.nodes[thisRoute]) {
      node = { nodes: {} }
      trie.nodes[thisRoute] = node
    } else {
      node = trie.nodes[thisRoute]
    }

    // we must recurse deeper
    return createNode(index + 1, node)
  })(0, this.trie)
}

// match a route on the trie
// and return the node
// str -> obj
Trie.prototype.match = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')

  var routes = route.replace(/^\//, '').split('/')
  var params = {}

  var node = (function search (index, trie) {
    // either there's no match, or we're done searching
    if (trie === undefined) return undefined
    var thisRoute = routes[index]
    if (thisRoute === undefined) return trie

    if (trie.nodes[thisRoute]) {
      // match regular routes first
      return search(index + 1, trie.nodes[thisRoute])
    } else if (trie.wildcard) {
      // match wildcards
      params['wildcard'] = decodeURIComponent(routes.slice(index).join('/'))
      // return early, or else search may keep recursing through the wildcard
      return trie.nodes['$$']
    } else if (trie.name) {
      // match named routes
      params[trie.name] = decodeURIComponent(thisRoute)
      return search(index + 1, trie.nodes['$$'])
    } else {
      // no matches found
      return search(index + 1)
    }
  })(0, this.trie)

  if (!node) return undefined
  node = xtend(node)
  node.params = params
  return node
}

// mount a trie onto a node at route
// (str, obj) -> null
Trie.prototype.mount = function (route, trie) {
  assert.equal(typeof route, 'string', 'route should be a string')
  assert.equal(typeof trie, 'object', 'trie should be a object')

  var split = route.replace(/^\//, '').split('/')
  var node = null
  var key = null

  if (split.length === 1) {
    key = split[0]
    node = this.create(key)
  } else {
    var headArr = split.splice(0, split.length - 1)
    var head = headArr.join('/')
    key = split[0]
    node = this.create(head)
  }

  mutate(node.nodes, trie.nodes)
  if (trie.name) node.name = trie.name

  // delegate properties from '/' to the new node
  // '/' cannot be reached once mounted
  if (node.nodes['']) {
    Object.keys(node.nodes['']).forEach(function (key) {
      if (key === 'nodes') return
      node[key] = node.nodes[''][key]
    })
    mutate(node.nodes, node.nodes[''].nodes)
    delete node.nodes[''].nodes
  }
}

},{"assert":2,"xtend":31,"xtend/mutable":32}],31:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],32:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],33:[function(require,module,exports){
'use strict';

module.exports = function yoyoifyAppendChild(el, childs) {
  for (var i = 0; i < childs.length; i++) {
    var node = childs[i];
    if (Array.isArray(node)) {
      yoyoifyAppendChild(el, node);
      continue;
    }
    if (typeof node === 'number' || typeof node === 'boolean' || node instanceof Date || node instanceof RegExp) {
      node = node.toString();
    }
    if (typeof node === 'string') {
      if (el.lastChild && el.lastChild.nodeName === '#text') {
        el.lastChild.nodeValue += node;
        continue;
      }
      node = document.createTextNode(node);
    }
    if (node && node.nodeType) {
      el.appendChild(node);
    }
  }
};

},{}],34:[function(require,module,exports){
'use strict';

module.exports = {
  TWITTER_URL: 'https://twitter.com/tus_osk',
  TWITTER_SCREEN_NAME: 'tus_osk',
  MAIL: 'os_ken@ed.tus.ac.jp'
};

},{}],35:[function(require,module,exports){
'use strict';

module.exports = {
  load: 'load',
  page: 'page'
};

},{}],36:[function(require,module,exports){
'use strict';

var keys = require('../keys');

module.exports = function loader(state, emitter) {
  state.load = false;
  emitter.on(keys.load, function () {
    state.load = true;
    emitter.emit('render');
  });
};

},{"../keys":35}],37:[function(require,module,exports){
'use strict';

var domify = require('domify');
var keys = require('../keys');

module.exports = function page(state, emitter) {
  state.page = {};

  emitter.on(keys.page, function (path) {
    state.page[path] = {
      status: 'loading'
    };
    var xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          state.page[path].status = 'ready';
          state.page[path].dom = domify(xhr.responseText);
        } else {
          state.page[path].status = 'error';
        }
        emitter.emit('render');
      }
    };
    xhr.open('GET', '/page/' + path + '.html');
    xhr.send();
    emitter.emit('render');
  });
};

},{"../keys":35,"domify":10}],38:[function(require,module,exports){
"use strict";

module.exports = function comp() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array.prototype.reduce.bind(args, function (v, f) {
    return f(v);
  });
};

},{}],39:[function(require,module,exports){
"use strict";

module.exports = function compact(array) {
  return array.filter(function (v) {
    return v != null;
  });
};

},{}],40:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var header = require('./components/header');

var scope = (null || true) && require('scopedify/scope')("_scope_403d37da");

module.exports = function _404View(state, emit) {
  return scope(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel5 = document.createElement("body");
    bel5.setAttribute("class", "root");
    var bel4 = document.createElement("section");
    bel4.setAttribute("class", "content");
    var bel3 = document.createElement("div");
    bel3.setAttribute("class", "wrap");
    var bel0 = document.createElement("div");
    bel0.setAttribute("class", "sorry");
    ac(bel0, ["Sorry :("]);
    var bel1 = document.createElement("div");
    bel1.setAttribute("class", "_404");
    ac(bel1, ["404"]);
    var bel2 = document.createElement("div");
    bel2.setAttribute("class", "not-found");
    ac(bel2, ["Not Found"]);
    ac(bel3, ["\n          ", bel0, "\n          ", bel1, "\n          ", bel2, "\n        "]);
    ac(bel4, ["\n        ", bel3, "\n      "]);
    ac(bel5, ["\n      ", arguments[0], "\n      ", bel4, "\n    "]);
    return bel5;
  }(header(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel0 = document.createElement("i");
    bel0.setAttribute("aria-hidden", "true");
    bel0.setAttribute("class", "fa fa-wrench");
    return bel0;
  }()).apply(undefined, arguments)));
};

},{"./components/header":45,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],41:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;

var button = require('./components/button');

var scope = (null || true) && require('scopedify/scope')("_scope_3a5debb1");

module.exports = function aboutView(state, emit) {
  return scope(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel6 = document.createElement("section");
    bel6.setAttribute("class", "root");
    var bel0 = document.createElement("div");
    bel0.setAttribute("class", "text");
    ac(bel0, ["OSK"]);
    var bel5 = document.createElement("div");
    bel5.setAttribute("class", "content");
    var bel4 = document.createElement("div");
    var bel1 = document.createElement("p");
    ac(bel1, ["\n            応用数学研究部(応数研, OSK)は東京理科大学一部研究会に属する部活動団体で、創部から半世紀以上たつ歴史ある団体です。\n          "]);
    var bel2 = document.createElement("p");
    ac(bel2, ["\n            コンピュータを利用してプログラミングを主に、計算機科学、WEB開発、アプリケーション開発、ゲーム開発、など様々なことに挑戦しています。\n          "]);
    var bel3 = document.createElement("p");
    bel3.setAttribute("class", "button");
    ac(bel3, ["\n            ", arguments[0], "\n          "]);
    ac(bel4, ["\n          ", bel1, "\n          ", bel2, "\n          ", bel3, "\n        "]);
    ac(bel5, ["\n        ", bel4, "\n      "]);
    ac(bel6, ["\n      ", bel0, "\n      ", bel5, "\n    "]);
    return bel6;
  }(button({
    child: 'DETAIL',
    href: '#page/main/about'
  }).apply(undefined, arguments)));
};

},{"./components/button":44,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],42:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var CONST = require('../src/constants');

var scope = (null || true) && require('scopedify/scope')("_scope_fb2d7904");

module.exports = function accessView(state, emit) {
    return scope(function () {

        var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
        var bel26 = document.createElement("section");
        bel26.setAttribute("class", "root");
        var bel11 = document.createElement("div");
        bel11.setAttribute("class", "box location");
        var bel10 = document.createElement("div");
        var bel2 = document.createElement("div");
        bel2.setAttribute("class", "title");
        var bel0 = document.createElement("i");
        bel0.setAttribute("aria-hidden", "true");
        bel0.setAttribute("class", "fa fa-compass");
        var bel1 = document.createElement("div");
        bel1.setAttribute("class", "text");
        ac(bel1, ["LOCATION"]);
        ac(bel2, ["\n            ", bel0, "\n            ", bel1, "\n          "]);
        var bel9 = document.createElement("div");
        bel9.setAttribute("class", "content");
        var bel5 = document.createElement("p");
        var bel3 = document.createElement("i");
        bel3.setAttribute("aria-hidden", "true");
        bel3.setAttribute("class", "fa fa-map-marker");
        var bel4 = document.createElement("span");
        ac(bel4, ["東京理科大学神楽坂キャンパス"]);
        ac(bel5, ["\n              ", bel3, "\n              ", bel4, "\n            "]);
        var bel8 = document.createElement("p");
        var bel6 = document.createElement("span");
        ac(bel6, ["2号館5階"]);
        var bel7 = document.createElement("span");
        ac(bel7, ["#2507"]);
        ac(bel8, ["\n              ", bel6, "\n              ", bel7, "\n            "]);
        ac(bel9, ["\n            ", bel5, "\n            ", bel8, "\n          "]);
        ac(bel10, ["\n          ", bel2, "\n          ", bel9, "\n        "]);
        ac(bel11, ["\n        ", bel10, "\n      "]);
        var bel25 = document.createElement("div");
        bel25.setAttribute("class", "box contact");
        var bel24 = document.createElement("div");
        var bel14 = document.createElement("div");
        bel14.setAttribute("class", "title");
        var bel12 = document.createElement("i");
        bel12.setAttribute("aria-hidden", "true");
        bel12.setAttribute("class", "fa fa-comments");
        var bel13 = document.createElement("div");
        bel13.setAttribute("class", "text");
        ac(bel13, ["CONTACT"]);
        ac(bel14, ["\n            ", bel12, "\n            ", bel13, "\n          "]);
        var bel23 = document.createElement("div");
        bel23.setAttribute("class", "content");
        var bel18 = document.createElement("p");
        var bel17 = document.createElement("a");
        bel17.setAttribute("href", arguments[1]);
        var bel15 = document.createElement("i");
        bel15.setAttribute("aria-hidden", "true");
        bel15.setAttribute("class", "fa fa-twitter");
        var bel16 = document.createElement("span");
        ac(bel16, [arguments[0]]);
        ac(bel17, ["\n                ", bel15, "\n                ", bel16, "\n              "]);
        ac(bel18, ["\n              ", bel17, "\n            "]);
        var bel22 = document.createElement("p");
        var bel21 = document.createElement("a");
        bel21.setAttribute("href", "mailto:" + arguments[3]);
        var bel19 = document.createElement("i");
        bel19.setAttribute("aria-hidden", "true");
        bel19.setAttribute("class", "fa fa-envelope");
        var bel20 = document.createElement("span");
        ac(bel20, [arguments[2]]);
        ac(bel21, ["\n                ", bel19, "\n                ", bel20, "\n              "]);
        ac(bel22, ["\n              ", bel21, "\n            "]);
        ac(bel23, ["\n            ", bel18, "\n            ", bel22, "\n          "]);
        ac(bel24, ["\n          ", bel14, "\n          ", bel23, "\n        "]);
        ac(bel25, ["\n        ", bel24, "\n      "]);
        ac(bel26, ["\n      ", bel11, "\n      ", bel25, "\n    "]);
        return bel26;
    }(CONST.TWITTER_SCREEN_NAME, CONST.TWITTER_URL, CONST.MAIL, CONST.MAIL));
};

},{"../src/constants":34,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],43:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;

var scope = (null || true) && require('scopedify/scope')("_scope_7392d306");

module.exports = function (child) {
  return function balloon(state, emit) {
    return scope(function () {

      var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
      var bel0 = document.createElement("div");
      bel0.setAttribute("class", "root");
      ac(bel0, ["\n        ", arguments[0], "\n      "]);
      return bel0;
    }(child));
  };
};

},{"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],44:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var html = require('choo/html');
var css = 0;
var comp = require('../../util/comp');
var compact = require('../../util/compact');
var scope = (null || true) && require('scopedify/scope')("_scope_a4b0eedd");

module.exports = function (opt) {
  return function button(state, emit) {
    return comp.apply(undefined, _toConsumableArray(compact([scope, opt.style])))(function () {

      var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
      var bel0 = document.createElement("a");
      bel0.setAttribute("href", arguments[0]);
      ac(bel0, ["\n        ", arguments[1], "\n      "]);
      return bel0;
    }(opt.href || '#', opt.child || ''));
  };
};

},{"../../util/comp":38,"../../util/compact":39,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],45:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var menu = require('./menu');

var scope = (null || true) && require('scopedify/scope')("_scope_a30bc079");

module.exports = function (iconSlot) {
  return function header(state, emit) {
    return scope(function () {

      var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
      var bel4 = document.createElement("header");
      bel4.setAttribute("class", "root");
      var bel2 = document.createElement("div");
      bel2.setAttribute("class", "text");
      var bel1 = document.createElement("a");
      bel1.setAttribute("href", "#");
      var bel0 = document.createElement("span");
      ac(bel0, ["OSK"]);
      ac(bel1, ["\n            ", arguments[0], "\n            ", bel0, "\n          "]);
      ac(bel2, ["\n          ", bel1, "\n        "]);
      var bel3 = document.createElement("nav");
      bel3.setAttribute("class", "menu");
      ac(bel3, ["\n          ", arguments[1], "\n        "]);
      ac(bel4, ["\n        ", bel2, "\n        ", bel3, "\n      "]);
      return bel4;
    }(iconSlot, menu.apply(undefined, arguments)));
  };
};

},{"./menu":47,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],46:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var keys = require('../../src/keys');
var comp = require('../../util/comp');

var scope = (null || true) && require('scopedify/scope')("_scope_40b2f743");

module.exports = function (path) {
  return function md(state, emit) {
    function load(p) {
      if (!p || p.status === 'error') {
        emit(keys.page, path);
      }
      return p;
    }

    return scope(function () {

      var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
      var bel0 = document.createElement("div");
      bel0.setAttribute("class", "root");
      ac(bel0, ["\n        ", arguments[0], "\n      "]);
      return bel0;
    }(comp(load, page)(state.page[path])));
  };
};

function page(p) {
  if (!p || p.status === 'loading') {
    return 'Loading...';
  } else if (p.status === 'error') {
    return 'Failed to load :(';
  } else if (p.status === 'ready') {
    return p.dom.cloneNode(true);
  }
}

},{"../../src/keys":35,"../../util/comp":38,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],47:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var CONST = require('../../src/constants');

var scope = (null || true) && require('scopedify/scope')("_scope_bdb0250e");

module.exports = function menu(state, emit) {
    return scope(function () {

        var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
        var bel10 = document.createElement("ul");
        bel10.setAttribute("class", "root");
        var bel1 = document.createElement("li");
        bel1.setAttribute("class", "item");
        var bel0 = document.createElement("a");
        bel0.setAttribute("href", "#page/main/about");
        ac(bel0, ["About"]);
        ac(bel1, [bel0]);
        var bel3 = document.createElement("li");
        bel3.setAttribute("class", "item");
        var bel2 = document.createElement("a");
        bel2.setAttribute("href", "#page/main/location");
        ac(bel2, ["Location"]);
        ac(bel3, [bel2]);
        var bel5 = document.createElement("li");
        bel5.setAttribute("class", "item");
        var bel4 = document.createElement("a");
        bel4.setAttribute("href", "#page/main/schedule");
        ac(bel4, ["Schedule"]);
        ac(bel5, [bel4]);
        var bel7 = document.createElement("li");
        bel7.setAttribute("class", "item");
        var bel6 = document.createElement("a");
        bel6.setAttribute("href", "#archive");
        ac(bel6, ["Archive"]);
        ac(bel7, [bel6]);
        var bel9 = document.createElement("li");
        bel9.setAttribute("class", "item");
        var bel8 = document.createElement("a");
        bel8.setAttribute("href", arguments[0]);
        ac(bel8, ["Twitter"]);
        ac(bel9, [bel8]);
        ac(bel10, ["\n      ", bel1, "\n      ", bel3, "\n      ", bel5, "\n      ", bel7, "\n      ", bel9, "\n    "]);
        return bel10;
    }(CONST.TWITTER_URL));
};

},{"../../src/constants":34,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],48:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var CONST = require('../src/constants');
var header = require('./components/header');

var scope = (null || true) && require('scopedify/scope')("_scope_4dd26a88");

module.exports = function contactView(state, emit) {
  return scope(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel11 = document.createElement("body");
    bel11.setAttribute("class", "root");
    var bel10 = document.createElement("section");
    bel10.setAttribute("class", "content");
    var bel2 = document.createElement("h1");
    var bel0 = document.createElement("i");
    bel0.setAttribute("aria-hidden", "true");
    bel0.setAttribute("class", "fa fa-twitter");
    var bel1 = document.createElement("span");
    ac(bel1, ["Twitter"]);
    ac(bel2, ["\n          ", bel0, "\n          ", bel1, "\n        "]);
    var bel4 = document.createElement("p");
    var bel3 = document.createElement("a");
    bel3.setAttribute("href", arguments[0]);
    ac(bel3, ["@", arguments[1]]);
    ac(bel4, ["\n          ", bel3, "\n        "]);
    var bel7 = document.createElement("h1");
    var bel5 = document.createElement("i");
    bel5.setAttribute("aria-hidden", "true");
    bel5.setAttribute("class", "fa fa-envelope");
    var bel6 = document.createElement("span");
    ac(bel6, ["Mail"]);
    ac(bel7, ["\n          ", bel5, "\n          ", bel6, "\n        "]);
    var bel9 = document.createElement("p");
    var bel8 = document.createElement("a");
    bel8.setAttribute("href", "mailto:" + arguments[2]);
    ac(bel8, [arguments[3]]);
    ac(bel9, ["\n          ", bel8, "\n        "]);
    ac(bel10, ["\n        ", bel2, "\n        ", bel4, "\n        ", bel7, "\n        ", bel9, "\n      "]);
    ac(bel11, ["\n      ", arguments[4], "\n      ", bel10, "\n    "]);
    return bel11;
  }(CONST.TWITTER_URL, CONST.TWITTER_SCREEN_NAME, CONST.MAIL, CONST.MAIL, header(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel0 = document.createElement("i");
    bel0.setAttribute("aria-hidden", "true");
    bel0.setAttribute("class", "fa fa-comments");
    return bel0;
  }()).apply(undefined, arguments)));
};

},{"../src/constants":34,"./components/header":45,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],49:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;

var scope = (null || true) && require('scopedify/scope')("_scope_ac4541c6");

module.exports = function footerView(state, emit) {
    return scope(function () {

        var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
        var bel2 = document.createElement("section");
        bel2.setAttribute("class", "root");
        var bel1 = document.createElement("div");
        var bel0 = document.createElement("div");
        bel0.setAttribute("class", "copyright");
        ac(bel0, ["Copyright (c) 2017 OSK"]);
        ac(bel1, ["\n        ", bel0, "\n      "]);
        ac(bel2, ["\n      ", bel1, "\n    "]);
        return bel2;
    }());
};

},{"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],50:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var keys = require('../src/keys');

var topView = require('./top');
var aboutView = require('./about');
var scheduleView = require('./schedule');
var newsView = require('./news');
var accessView = require('./access');
var footerView = require('./footer');

var scope = (null || true) && require('scopedify/scope')("_scope_2804b154");

module.exports = function mainView(state, emit) {
  return scope(function () {
    var onload = require('/home/ubuntu/oskt.us/node_modules/on-load/index.js');
    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel0 = document.createElement("body");
    var args = arguments;
    onload(bel0, function bel_onload() {
      args[0](bel0);
    }, function bel_onunload() {}, "o0");
    bel0.setAttribute("class", "root");
    ac(bel0, ["\n      ", arguments[1], "\n      ", arguments[2], "\n      ", arguments[3], "\n      ", arguments[4], "\n      ", arguments[5], "\n      ", arguments[6], "\n    "]);
    return bel0;
  }(emit.bind(null, keys.load), topView.apply(undefined, arguments), aboutView.apply(undefined, arguments), scheduleView.apply(undefined, arguments), newsView.apply(undefined, arguments), accessView.apply(undefined, arguments), footerView.apply(undefined, arguments)));
};

},{"../src/keys":35,"./about":41,"./access":42,"./footer":49,"./news":51,"./schedule":54,"./top":55,"/home/ubuntu/oskt.us/node_modules/on-load/index.js":23,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],51:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var md = require('./components/md');

var scope = (null || true) && require('scopedify/scope')("_scope_75f489a3");

var NEWS_PATH = 'main/news';

module.exports = function newsView(state, emit) {
    return scope(function () {

        var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
        var bel2 = document.createElement("section");
        bel2.setAttribute("class", "root");
        var bel1 = document.createElement("div");
        var bel0 = document.createElement("div");
        bel0.setAttribute("class", "title");
        ac(bel0, ["NEWS"]);
        ac(bel1, ["\n        ", bel0, "\n        ", arguments[0], "\n      "]);
        ac(bel2, ["\n      ", bel1, "\n    "]);
        return bel2;
    }(md(NEWS_PATH).apply(undefined, arguments)));
};

},{"./components/md":46,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],52:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var md = require('./components/md');
var header = require('./components/header');

var scope = (null || true) && require('scopedify/scope')("_scope_8d354b08");

module.exports = function pageView(state, emit) {
  return scope(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel1 = document.createElement("body");
    bel1.setAttribute("class", "root");
    var bel0 = document.createElement("section");
    bel0.setAttribute("class", "content");
    ac(bel0, ["\n        ", arguments[0], "\n      "]);
    ac(bel1, ["\n      ", arguments[1], "\n      ", bel0, "\n    "]);
    return bel1;
  }(md(state.params.wildcard).apply(undefined, arguments), header(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel0 = document.createElement("i");
    bel0.setAttribute("aria-hidden", "true");
    bel0.setAttribute("class", "fa fa-code-fork");
    return bel0;
  }()).apply(undefined, arguments)));
};

},{"./components/header":45,"./components/md":46,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],53:[function(require,module,exports){
'use strict';

var css = 0;(null || true) && require('scopedify/scope')("_scope_6e92d9d3");(null || true) && require('scopedify/scope')("_scope_3e391cb2");

},{"insert-css":15,"scopedify/scope":25}],54:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;

var scope = (null || true) && require('scopedify/scope')("_scope_f8cc4e36");

module.exports = function scheduleView(state, emit) {
    return scope(function () {

        var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
        var bel37 = document.createElement("section");
        bel37.setAttribute("class", "root");
        var bel36 = document.createElement("div");
        var bel0 = document.createElement("div");
        bel0.setAttribute("class", "title");
        ac(bel0, ["SCHEDULE"]);
        var bel35 = document.createElement("div");
        bel35.setAttribute("class", "content");
        var bel34 = document.createElement("div");
        bel34.setAttribute("class", "timeline");
        var bel3 = document.createElement("div");
        bel3.setAttribute("class", "header");
        var bel1 = document.createElement("div");
        bel1.setAttribute("class", "month");
        ac(bel1, ["Month"]);
        var bel2 = document.createElement("div");
        bel2.setAttribute("class", "detail");
        ac(bel2, ["Activities / Events"]);
        ac(bel3, ["\n              ", bel1, "\n              ", bel2, "\n            "]);
        var bel33 = document.createElement("div");
        bel33.setAttribute("class", "table");
        var bel16 = document.createElement("div");
        bel16.setAttribute("class", "month column");
        var bel4 = document.createElement("div");
        bel4.setAttribute("class", "row label");
        ac(bel4, ["4"]);
        var bel5 = document.createElement("div");
        bel5.setAttribute("class", "row label");
        ac(bel5, ["5"]);
        var bel6 = document.createElement("div");
        bel6.setAttribute("class", "row label");
        ac(bel6, ["6"]);
        var bel7 = document.createElement("div");
        bel7.setAttribute("class", "row label");
        ac(bel7, ["7"]);
        var bel8 = document.createElement("div");
        bel8.setAttribute("class", "row label");
        ac(bel8, ["8"]);
        var bel9 = document.createElement("div");
        bel9.setAttribute("class", "row label");
        ac(bel9, ["9"]);
        var bel10 = document.createElement("div");
        bel10.setAttribute("class", "row label");
        ac(bel10, ["10"]);
        var bel11 = document.createElement("div");
        bel11.setAttribute("class", "row label");
        ac(bel11, ["11"]);
        var bel12 = document.createElement("div");
        bel12.setAttribute("class", "row label");
        ac(bel12, ["12"]);
        var bel13 = document.createElement("div");
        bel13.setAttribute("class", "row label");
        ac(bel13, ["1"]);
        var bel14 = document.createElement("div");
        bel14.setAttribute("class", "row label");
        ac(bel14, ["2"]);
        var bel15 = document.createElement("div");
        bel15.setAttribute("class", "row label");
        ac(bel15, ["3"]);
        ac(bel16, ["\n                ", bel4, "\n                ", bel5, "\n                ", bel6, "\n                ", bel7, "\n                ", bel8, "\n                ", bel9, "\n                ", bel10, "\n                ", bel11, "\n                ", bel12, "\n                ", bel13, "\n                ", bel14, "\n                ", bel15, "\n              "]);
        var bel32 = document.createElement("div");
        bel32.setAttribute("class", "detail column");
        var bel19 = document.createElement("div");
        bel19.setAttribute("class", "row events big l-group");
        var bel17 = document.createElement("div");
        bel17.setAttribute("class", "ja");
        ac(bel17, ["レクチャー班活動"]);
        var bel18 = document.createElement("div");
        bel18.setAttribute("class", "en");
        ac(bel18, ["Lecture Groups"]);
        ac(bel19, ["\n                  ", bel17, "\n                  ", bel18, "\n                "]);
        var bel22 = document.createElement("div");
        bel22.setAttribute("class", "row events small summer-camp");
        var bel20 = document.createElement("div");
        bel20.setAttribute("class", "ja");
        ac(bel20, ["夏合宿"]);
        var bel21 = document.createElement("div");
        bel21.setAttribute("class", "en");
        ac(bel21, ["Summer Camp"]);
        ac(bel22, ["\n                  ", bel20, "\n                  ", bel21, "\n                "]);
        var bel25 = document.createElement("div");
        bel25.setAttribute("class", "row events small festival");
        var bel23 = document.createElement("div");
        bel23.setAttribute("class", "ja");
        ac(bel23, ["理大祭"]);
        var bel24 = document.createElement("div");
        bel24.setAttribute("class", "en");
        ac(bel24, ["Festival"]);
        ac(bel25, ["\n                  ", bel23, "\n                  ", bel24, "\n                "]);
        var bel28 = document.createElement("div");
        bel28.setAttribute("class", "row events big p-group");
        var bel26 = document.createElement("div");
        bel26.setAttribute("class", "ja");
        ac(bel26, ["プロジェクト班活動"]);
        var bel27 = document.createElement("div");
        bel27.setAttribute("class", "en");
        ac(bel27, ["Project Groups"]);
        ac(bel28, ["\n                  ", bel26, "\n                  ", bel27, "\n                "]);
        var bel31 = document.createElement("div");
        bel31.setAttribute("class", "row events small winter-camp");
        var bel29 = document.createElement("div");
        bel29.setAttribute("class", "ja");
        ac(bel29, ["冬合宿"]);
        var bel30 = document.createElement("div");
        bel30.setAttribute("class", "en");
        ac(bel30, ["Winter Camp"]);
        ac(bel31, ["\n                  ", bel29, "\n                  ", bel30, "\n                "]);
        ac(bel32, ["\n                ", bel19, "\n                ", bel22, "\n                ", bel25, "\n                ", bel28, "\n                ", bel31, "\n              "]);
        ac(bel33, ["\n              ", bel16, "\n              ", bel32, "\n            "]);
        ac(bel34, ["\n            ", bel3, "\n            ", bel33, "\n          "]);
        ac(bel35, ["\n          ", bel34, "\n        "]);
        ac(bel36, ["\n        ", bel0, "\n        ", bel35, "\n      "]);
        ac(bel37, ["\n      ", bel36, "\n    "]);
        return bel37;
    }());
};

},{"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}],55:[function(require,module,exports){
'use strict';

var html = require('choo/html');
var css = 0;
var menu = require('./components/menu');
var balloon = require('./components/balloon');

var scope = (null || true) && require('scopedify/scope')("_scope_0edb10e2");

module.exports = function topView(state, emit) {
  return scope(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel9 = document.createElement("header");
    bel9.setAttribute("class", "root");
    var bel8 = document.createElement("div");
    bel8.setAttribute("class", "base " + arguments[2]);
    var bel0 = document.createElement("nav");
    bel0.setAttribute("class", "menu");
    ac(bel0, ["\n          ", arguments[0], "\n          ", arguments[1], "\n        "]);
    var bel1 = document.createElement("div");
    bel1.setAttribute("class", "pic");
    var bel6 = document.createElement("div");
    bel6.setAttribute("class", "names");
    var bel2 = document.createElement("div");
    bel2.setAttribute("class", "name first");
    ac(bel2, ["応用"]);
    var bel3 = document.createElement("div");
    bel3.setAttribute("class", "name second");
    ac(bel3, ["数学"]);
    var bel4 = document.createElement("div");
    bel4.setAttribute("class", "name third");
    ac(bel4, ["研究部"]);
    var bel5 = document.createElement("div");
    bel5.setAttribute("class", "name fourth");
    ac(bel5, ["東京理科大学"]);
    ac(bel6, ["\n          ", bel2, "\n          ", bel3, "\n          ", bel4, "\n          ", bel5, "\n        "]);
    var bel7 = document.createElement("div");
    bel7.setAttribute("class", "arrow");
    ac(bel8, ["\n        ", bel0, "\n        ", bel1, "\n        ", bel6, "\n        ", bel7, "\n      "]);
    ac(bel9, ["\n      ", bel8, "\n    "]);
    return bel9;
  }(menu.apply(undefined, arguments), balloon(function () {

    var ac = require('/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js');
    var bel2 = document.createElement("a");
    bel2.setAttribute("href", "#page/2017/welcome");
    var bel0 = document.createElement("i");
    bel0.setAttribute("aria-hidden", "true");
    bel0.setAttribute("class", "fa fa-exclamation-circle");
    var bel1 = document.createElement("span");
    ac(bel1, ["新歓情報"]);
    ac(bel2, ["\n              ", bel0, "\n              ", bel1, "\n            "]);
    return bel2;
  }()).apply(undefined, arguments), state.load ? 'anim' : ''));
};

},{"./components/balloon":43,"./components/menu":47,"/home/ubuntu/oskt.us/node_modules/yo-yoify/lib/appendChild.js":33,"choo/html":5,"insert-css":15,"scopedify/scope":25}]},{},[1]);
