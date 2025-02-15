// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var INITIAL_VELOCITY = 0.055;
var player1 = 0;
var player2 = 0;
var winner = {};
//const VELCOITY_INC = 0.000001
var Ball = exports.default = /*#__PURE__*/function () {
  function Ball(ballElement) {
    _classCallCheck(this, Ball);
    this.ballElement = ballElement;
    this.reset();
  }
  return _createClass(Ball, [{
    key: "x",
    get: function get() {
      return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));
      //get the variable --x value from css for the ball element and convert into float and return
    },
    set: function set(value) {
      this.ballElement.style.setProperty("--x", value);
      //set the current position of the ball on x axis
    }
  }, {
    key: "y",
    get: function get() {
      return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));
      //get the variable --x value from css for the ball element and convert into float and return
    },
    set: function set(value) {
      this.ballElement.style.setProperty("--y", value);
      //set the current position of the ball on x axis
    }
  }, {
    key: "reset",
    value: function reset() {
      var rect = this.rect();
      if (rect.top <= 0) {
        this.y = 5;
        this.direction = {
          x: 0,
          y: 10
        };
      } else if (rect.bottom >= innerHeight) {
        this.y = 95;
        this.direction = {
          x: 0,
          y: 90
        };
      } else {
        this.y = 50;
        this.direction = {
          x: 0,
          y: 0
        };
      }
      this.x = 50;
      while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
        var heading = random(0, 2 * Math.PI);
        this.direction = {
          x: Math.cos(heading),
          y: Math.sin(heading)
        };
      }
      this.velocity = INITIAL_VELOCITY;
      player1 = 0;
      player2 = 0;
    }
  }, {
    key: "rect",
    value: function rect() {
      return this.ballElement.getBoundingClientRect();
    }
  }, {
    key: "update",
    value: function update(time_diff, paddleCor) {
      this.x += this.direction.x * time_diff * this.velocity;
      this.y += this.direction.y * this.velocity * time_diff;
      var rect = this.rect();
      if (rect.right >= window.innerWidth || rect.left <= 0) {
        this.direction.x *= -1;
      }
      //  if(paddleCor.some(r=>isCollision(r,rect)))
      //  {
      //     this.direction.y*=-1;
      //  }
      //   }

      // for (let i = 0; i < paddleCor.length; i++) {
      //     if (isCollision(paddleCor[i], rect)) {
      //       // Determine which side of the paddle the ball hit
      //       const paddleCenter = (paddleCor[i].left + paddleCor[i].right) / 2;
      //       const ballCenter = (rect.left + rect.right) / 2;
      //       const offset = ballCenter - paddleCenter;
      //       console.log();
      //       // Update ball direction based on which side of the paddle was hit

      //       this.direction.y *= -1;
      //       break; // Only handle collision with one paddle
      //     }
      //   }
      // }\

      for (var i = 1; i < paddleCor.length; i++) {
        if (isCollision(paddleCor[i], rect)) {
          player2 += 1;
          console.log("player_2 : " + player2);
          this.direction.y *= -1;
        }
        if (isCollision(paddleCor[i - 1], rect)) {
          player1 += 1;
          console.log("player_1 : " + player1);
          this.direction.y *= -1;
        }
      }
    }
  }, {
    key: "maxScore",
    value: function maxScore() {
      winner["player"] = player1 >= player2 ? player1 : player2;
    }
  }]);
}();
function isCollision(rect1, rect2) {
  return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top;
}
function random(min, max) {
  return Math.random() * (max - min) + min;
}
},{}],"src/Paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Paddle = exports.default = /*#__PURE__*/function () {
  function Paddle(paddle) {
    _classCallCheck(this, Paddle);
    this.paddle = paddle;
  }
  return _createClass(Paddle, [{
    key: "moveUp",
    value: function moveUp(value) {
      var s = parseFloat(getComputedStyle(this.paddle).getPropertyValue("--posLeft")) + value;
      this.paddle.style.setProperty("--posLeft", s);
    }
  }, {
    key: "moveDown",
    value: function moveDown(value) {
      var q = parseFloat(getComputedStyle(this.paddle).getPropertyValue("--posLeft")) + value;
      this.paddle.style.setProperty("--posLeft", q);
    }
  }, {
    key: "rect",
    value: function rect() {
      return this.paddle.getBoundingClientRect();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.paddle.style.setProperty("--posLeft", 110);
    }
  }]);
}();
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Ball = _interopRequireDefault(require("./Ball.js"));
var _Paddle = _interopRequireDefault(require("./Paddle.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//update loop

var p1 = document.querySelector("#player-paddle1");
var ball = new _Ball.default(document.getElementById("ball")); //create the new ball element with ball id div
var paddle = new _Paddle.default(document.getElementById("player-paddle1"));
var paddle1 = new _Paddle.default(document.getElementById("player-paddle2"));
var win = null;
var prev_time = null;
var play = false;
function update(time) {
  if (prev_time != null) {
    var time_diff = time - prev_time;
    if (play == true) {
      ball.update(time_diff, [paddle.rect(), paddle1.rect()]);
    }
    if (game_over()) {
      playerLose();
      play = false;
      document.addEventListener("keydown", function (event) {
        if (event.code === "Enter" || event.key === "Enter") {
          play = true;
          window.requestAnimationFrame(update);
        }
      });
    }
  }
  prev_time = time;
  window.requestAnimationFrame(update);
}
function game_over() {
  var rect = ball.rect();
  return rect.bottom >= window.innerHeight || rect.top <= 0;
}
function playerLose() {
  ball.reset();
  paddle.reset();
  paddle1.reset();
}
document.addEventListener("keydown", function (event) {
  var paddlePos = p1.offsetLeft;
  var paddleHeight = 100;
  if (event.key == "a" && paddlePos > 20) {
    paddle.moveUp(-10);
    paddle1.moveUp(-10);
  }
  if (event.key == "d" && paddlePos < window.innerWidth - 61) {
    paddle.moveDown(10);
    paddle1.moveDown(10);
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" || event.key === "Enter") {
    play = true;
    window.requestAnimationFrame(update);
  }
});
},{"./Ball.js":"src/Ball.js","./Paddle.js":"src/Paddle.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53628" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map