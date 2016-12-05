webpackJsonp([5],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/bg.png";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/sex_bg.png";

/***/ },
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + "px";

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./hate.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./hate.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0; }\n\nhtml, body {\n  width: 100%;\n  height: 100%; }\n\n.mark {\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 9999; }\n\n.dialog {\n  width: 300px;\n  height: 86px;\n  border: 1px solid #000;\n  border-radius: 5px;\n  overflow: hidden;\n  z-index: 10000;\n  color: #fff;\n  text-align: center;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto; }\n\n.dialog p {\n  height: 48px;\n  background: #999;\n  line-height: 48px; }\n\n.dialog section {\n  height: 38px;\n  line-height: 38px;\n  background: #666; }\n\n.dialog section span {\n  display: inline-block;\n  width: 30%;\n  margin-right: 10px; }\n\nhtml {\n  font-size: 16px; }\n\nhtml, body {\n  width: 100%;\n  height: 100%; }\n\n.hate {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  position: relative; }\n  .hate .hate_section {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    -webkit-box-flex: 1;\n    background: url(" + __webpack_require__(5) + ") no-repeat;\n    background-size: cover; }\n    .hate .hate_section .hate_wrap {\n      width: 95%;\n      height: 7.2rem;\n      margin-left: 5%;\n      margin-top: .82rem;\n      background: url(" + __webpack_require__(6) + ") no-repeat;\n      background-size: cover;\n      position: relative; }\n      .hate .hate_section .hate_wrap .cai {\n        display: block;\n        width: 1.82rem;\n        position: absolute;\n        left: -.6rem;\n        bottom: -.5rem; }\n        .hate .hate_section .hate_wrap .cai img {\n          width: 100%;\n          height: 100%; }\n      .hate .hate_section .hate_wrap .hate_food {\n        width: 90%;\n        height: 100%; }\n        .hate .hate_section .hate_wrap .hate_food h2 {\n          color: #B00600;\n          width: 100%;\n          text-align: center;\n          line-height: 1.74rem;\n          font-size: .35rem; }\n        .hate .hate_section .hate_wrap .hate_food .hate_content ul {\n          display: -webkit-flex;\n          -webkit-flex-wrap: wrap; }\n          .hate .hate_section .hate_wrap .hate_food .hate_content ul li {\n            width: 50%;\n            text-align: center;\n            line-height: .64rem;\n            font-size: 16px; }\n            .hate .hate_section .hate_wrap .hate_food .hate_content ul li span {\n              width: .36rem;\n              height: .36rem;\n              display: inline-block;\n              background: url(" + __webpack_require__(15) + ") no-repeat;\n              background-size: cover; }\n            .hate .hate_section .hate_wrap .hate_food .hate_content ul li span.active {\n              width: .36rem;\n              height: .36rem;\n              display: inline-block;\n              background: url(" + __webpack_require__(16) + ") no-repeat;\n              background-size: cover; }\n            .hate .hate_section .hate_wrap .hate_food .hate_content ul li i {\n              display: inline-block;\n              font-size: 16px;\n              margin-left: .1rem; }\n        .hate .hate_section .hate_wrap .hate_food .go-test {\n          display: block;\n          width: 2.35rem;\n          height: 1.05rem;\n          position: absolute;\n          left: 50%;\n          bottom: .7rem;\n          margin-left: -1.17rem; }\n          .hate .hate_section .hate_wrap .hate_food .go-test img {\n            width: 100%;\n            height: 100%; }\n  .hate .mask_layer {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    background: rgba(0, 0, 0, 0.7);\n    z-index: 10009;\n    display: none; }\n  .hate .tan {\n    width: 85%;\n    height: 6.25rem;\n    background: url(" + __webpack_require__(17) + ") no-repeat;\n    background-size: cover;\n    margin: 1rem auto;\n    z-index: 10010;\n    position: relative;\n    display: none; }\n    .hate .tan .quxiao {\n      display: block;\n      width: .54rem;\n      height: .62rem;\n      position: absolute;\n      right: 5%;\n      top: 0; }\n      .hate .tan .quxiao img {\n        width: 100%;\n        height: 100%; }\n    .hate .tan a {\n      display: block;\n      width: 2.42rem;\n      height: 1rem;\n      position: absolute;\n      left: 50%;\n      bottom: .14rem;\n      margin-left: -1.21rem; }\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhGgAaAJEAADMzM//zv////wAAACH5BAEHAAIALAAAAAAaABoAAAI5hI+py90Bo5w0oIrrzRzunn2gdoxhaZJGqgIsJb4WKnt0Hb85u6e9+RsFQcNOkXM8rWo2h/MJVRQAADs="

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhGgAaANUAADMzM93Tp1lXTa2lhomEbjo6OPnuu8W8l3VxYEtKQ+rfsaWfgrKrimllWP/zv83EnJeReEJBPU9NRvLntoN+atTKoenfsL62k2FfU0VEQJKNdP3xvVZUS62ljH15Zm1pW9bFnPTot+HXq1JQSKihg52We0pCQl5cUevgsbW1jP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHACoALAAAAAAaABoAAAaoQIBwSCwaj8hk0sFsOp9QBzFKdZ4AjWmVCgEURNrtsyIsSYfiZ0gC4BjOwrSTIqwww+mLkNDEb1ERAAkhfWhyH0IXTn5UJEIIT4xQAQUAEQqRQwwLCwOETwYCQgNQRAEJQhkDG04aQhismXEWokIcB0wPQwFRWiFZQw0PqAAQVGEGHkcjb72GTV1FD1WMA0QUW5IHlRkT2c9jESliknJ34OaLSuvs7UdBADs="

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/question.gif";

/***/ }
]);