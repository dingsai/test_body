webpackJsonp([3],[
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
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhIgAiAMQAADMzM/Tot5iSeM3EnUlHQndzYu3is6mihG9rXOHXqzo6Mf/zv7y0kfnuu0A/PFFQSLCoiebcrqegg315Zu/ktP3xvq2lhHl1Y5yWe9bFnEVEQHBsXTs7OP///wAAAAAAACH5BAEHAB0ALAAAAAAiACIAAAX/4CKOpJhA08NxzwQlVSnPYoBxQK7vABbQQIEOIRkYGg3DQILAAQQNIClCADgEBqlB4AAQItLFIFfIhkWGQm4AHAMOZ9lhPYvkGPEZIwcuVeF5M3MEFYWFQgWBQGoCIwFWZooyBl0/CxhPkkE9IiuRmiUGKxUJAAigQAgAJwASqDQSACgAbK8yYykAn7ZoAA9dUbwkDQArAMHCIsQsuskjBr4TtM4iuBCt1AtzL6bZqjCezqIchZiNyUIYNZDClACWC4jCjH5vtoPIInYAeKB7AH1KuAGkaM40Gm4u7AJi4AIdKRE0WBFAQQoFLgA0BAwjJMcGCRmOJMkgYYMTKIpsDzjhscPHqxMpVrR4EUNKCAA7"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhIgAiANUAADMzM+3is4N+akJBPb62k2FfU/nuu9TKoaWfgk9NRjo6MXdzYpeReM3EnP/zv66niObcrkdGQe/ktJKNdK2lhn15Zv3xvVZUS21pW/Tot7KriuHXq5yWe8W8l0VEQNbFnKihg3l1Y3BsXd3Tp2llWImEbllXTTo6OFJQSEtKQ+betbW1jF5cUf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAC0ALAAAAAAiACIAAAb/QIdwSBRuHhXU6YSqPDaWonQqzHBOgKx2C+BkqGCGVgQ6BAyGwAEkwgIYBjAREgEMGAF5gDEARCByDg1ZC3mBQgELWQ1gB1kgh1Igi1MQWQSRUwRZgEV1kJlTkxEWpaViC6FFLAAkDooMQxl2hqoOYicbDgF9Xw4cb7ZCjl1DYhxCS7WhGQkAF3GISxYbACLCDgJZB0UiAEcAoKqbACWSAEgAjKq8fr5EjkkAy5EYl1MBACh90ZmTAKmmGACwBEC/QyOwDKA3ZCCTeUM0IEDw4F1DE1kogMnXBAA3ISNSZPHwIMqQCVkKmJwS70G4ORizXOggZFCWEXImPbFWJAOJfS0kGogMJscbFGVFDFTgkgXFQSkBplkAFkuKGC7rwhRzMGvhFApbBARq9w4VlQ5YPFicAsvTS5YDVgQa9dQSAEzYyHUqYlNcqH9ZpdgMwZBKgBCU5EDwYIeBBDkS+ADwsDfQVWtlzqRZ0yYLHFVW3DDV4gWbESRKmDiBEigIADs="

/***/ },
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./allergy.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./allergy.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "html {\n  font-size: 16px; }\n\nhtml, body {\n  width: 100%;\n  height: 100%; }\n\n.allergy {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  -webkit-box-orient: vertical; }\n  .allergy .allergy_section {\n    width: 100%;\n    height: 100%;\n    -webkit-box-flex: 1;\n    background: url(" + __webpack_require__(5) + ") no-repeat;\n    background-size: cover; }\n    .allergy .allergy_section .allergy_wrap {\n      width: 95%;\n      height: 7.2rem;\n      margin-left: 5%;\n      background: url(" + __webpack_require__(6) + ") no-repeat;\n      background-size: cover;\n      position: relative; }\n      .allergy .allergy_section .allergy_wrap .cai {\n        display: block;\n        width: 1.82rem;\n        position: absolute;\n        left: -.6rem;\n        bottom: -.5rem; }\n        .allergy .allergy_section .allergy_wrap .cai img {\n          width: 100%;\n          height: 100%; }\n      .allergy .allergy_section .allergy_wrap .allergy_food {\n        width: 90%;\n        height: 100%;\n        position: relative; }\n        .allergy .allergy_section .allergy_wrap .allergy_food h2 {\n          color: #B00600;\n          width: 100%;\n          text-align: center;\n          line-height: 1.74rem;\n          font-size: .35rem; }\n        .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical {\n          width: 80%;\n          margin: auto; }\n          .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical ul {\n            width: 100%;\n            height: .4rem;\n            display: -webkit-box; }\n            .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical ul li {\n              width: 50%;\n              position: relative; }\n              .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical ul li span {\n                display: inline-block;\n                width: .32rem;\n                height: .32rem;\n                background: url(" + __webpack_require__(7) + ") no-repeat;\n                background-size: cover;\n                float: left;\n                margin-left: 30%; }\n              .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical ul li em {\n                font-size: 16px;\n                position: absolute;\n                left: 60%;\n                top: 0; }\n              .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical ul li span.active {\n                background: url(" + __webpack_require__(8) + ") no-repeat;\n                background-size: cover; }\n          .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical .seek {\n            width: 100%;\n            margin-top: .32rem;\n            border: 1px solid #9D864E;\n            position: relative; }\n            .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical .seek .top-arrow {\n              width: .26rem;\n              height: .26rem;\n              position: absolute;\n              right: 30%;\n              top: -.15rem;\n              border: 1px solid #9D864E;\n              transform: rotate(45deg);\n              border-right: none;\n              border-bottom: none; }\n            .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical .seek ol {\n              width: 100%;\n              display: -webkit-flex;\n              -webkit-flex-wrap: wrap; }\n              .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical .seek ol li {\n                padding: .1rem;\n                height: .5rem;\n                line-height: .3rem;\n                text-align: center;\n                border: 1px solid #9D864E;\n                border-radius: 5px;\n                margin: .08rem .18rem;\n                font-size: 16px; }\n              .allergy .allergy_section .allergy_wrap .allergy_food .choice_medical .seek ol li.li_active {\n                background: #F6514B;\n                color: #fff; }\n        .allergy .allergy_section .allergy_wrap .allergy_food .go-hate {\n          display: block;\n          width: 2.35rem;\n          height: 1.05rem;\n          position: absolute;\n          left: 30%;\n          bottom: .7rem; }\n          .allergy .allergy_section .allergy_wrap .allergy_food .go-hate img {\n            width: 100%;\n            height: 100%; }\n", ""]);

	// exports


/***/ }
]);