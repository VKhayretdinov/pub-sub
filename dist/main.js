/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pub_sub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pub-sub */ \"./src/pub-sub.js\");\n/* harmony import */ var _subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscriber */ \"./src/subscriber.js\");\n\n\n\n/**\n * Class repesenting a Circle subscriber\n *\n * @class Circle\n * @extends {Subscriber}\n */\nclass Circle extends _subscriber__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  /**\n   * Update background color of circle\n   *\n   * @param {string} color new color\n   * @memberof Circle\n   */\n  update(color) {\n    this.element.style.backgroundColor = color;\n  }\n}\n\n/**\n * Class repesenting a ChangeCircle subscriber\n *\n * @class ChangedCircle\n * @extends {Subscriber}\n */\nclass ChangedCircle extends _subscriber__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(element) {\n    super(element);\n    this.radiuses = ['0%', '5%', '20%', '30%', '40%'];\n  }\n\n  /**\n   * Update background color of circle\n   *\n   * @param {string} color new color\n   * @memberof Circle\n   */\n  update(color) {\n    this.element.style.backgroundColor = color;\n    this.element.style.borderRadius = `${this.randomRadius()} ${this.randomRadius()}`;\n  }\n\n  /**\n   * Return random radius from radiuses array\n   *\n   * @returns random radius from radiuses array\n   * @memberof ChangedCircle\n   */\n  randomRadius() {\n    return this.radiuses[Math.floor(Math.random() * this.radiuses.length)];\n  }\n}\n\nconst colorPicker = document.getElementById('color-picker');\n\nconst circle1 = new Circle('circle-1');\nconst circle2 = new ChangedCircle('circle-2');\nconst circle3 = new Circle('circle-3');\nconst circle4 = new ChangedCircle('circle-4');\n\nconst colorBus = new _pub_sub__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nconst circles = [];\ncircles.push(circle1);\ncircles.push(circle3);\n\nconst changedCircles = [];\nchangedCircles.push(circle2);\nchangedCircles.push(circle4);\n\n// Subcribe elements\ncircles.forEach(subscriber => colorBus.subscribe('color', subscriber));\nchangedCircles.forEach(subscriber => colorBus.subscribe('color and shape', subscriber));\n\ncircles.forEach((subscriber) => {\n  subscriber.buttons[0].addEventListener('click', () => {\n    colorBus.subscribe('color', subscriber);\n  });\n  subscriber.buttons[1].addEventListener('click', () => {\n    colorBus.unsubscribe('color', subscriber);\n  });\n});\n\nchangedCircles.forEach((subscriber) => {\n  subscriber.buttons[0].addEventListener('click', () => {\n    colorBus.subscribe('color and shape', subscriber);\n  });\n  subscriber.buttons[1].addEventListener('click', () => {\n    colorBus.unsubscribe('color and shape', subscriber);\n  });\n});\n\ncolorPicker.addEventListener('change', (e) => {\n  colorBus.publish('color', e.target.value);\n  colorBus.publish('color and shape', e.target.value);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pub-sub.js":
/*!************************!*\
  !*** ./src/pub-sub.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Bus {\n  constructor() {\n    this.rooms = {};\n  }\n\n  /**\n   * Add new subscriber to array\n   *\n   * @param {*} roomName Name of the room\n   * @param {*} obj New subscriber\n   * @memberof Bus\n   */\n  subscribe(roomName, obj) {\n    this.rooms[roomName] = this.rooms[roomName] || [];\n    this.rooms[roomName].push(obj);\n  }\n\n  /**\n   * Send event from publisher\n   *\n   * @param {*} roomName Name of the room\n   * @param {*} data Param for subscriber method\n   * @memberof Bus\n   */\n  publish(roomName, data) {\n    if (this.rooms[roomName]) {\n      this.rooms[roomName].forEach((element) => { element.update(data); });\n    }\n  }\n\n  /**\n   * Remove subscriber from Array\n   *\n   * @param {*} roomName\n   * @param {*} obj\n   * @memberof Bus\n   */\n  unsubscribe(roomName, obj) {\n    if (this.rooms[roomName]) {\n      const tmpArr = this.rooms[roomName].filter(elemet => elemet !== obj);\n      this.rooms[roomName] = tmpArr;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bus);\n\n\n//# sourceURL=webpack:///./src/pub-sub.js?");

/***/ }),

/***/ "./src/subscriber.js":
/*!***************************!*\
  !*** ./src/subscriber.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Subscriber {\n  constructor(id) {\n    this.element = document.getElementById(id);\n    this.buttons = this.element.previousElementSibling.getElementsByTagName('button');\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Subscriber);\n\n\n//# sourceURL=webpack:///./src/subscriber.js?");

/***/ })

/******/ });