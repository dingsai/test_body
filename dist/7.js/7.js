webpackJsonp([7],[
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
/* 5 */,
/* 6 */,
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
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./pinghezhi.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./pinghezhi.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "html {\n  font-size: 16px; }\n\n.deficiency {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  -webkit-box-orient: vertical; }\n  .deficiency .box {\n    width: 100%;\n    height: 100%;\n    overflow-y: auto; }\n  .deficiency .de_title {\n    width: 100%;\n    height: 2.5rem;\n    background: #F6514B;\n    position: relative; }\n    .deficiency .de_title p {\n      margin-left: .44rem;\n      color: #fff;\n      font-size: .23rem;\n      line-height: .4rem; }\n    .deficiency .de_title .body_quality {\n      margin-top: .5rem; }\n    .deficiency .de_title .result {\n      font-size: .35rem; }\n    .deficiency .de_title .character {\n      width: 80%; }\n    .deficiency .de_title .right-arrow {\n      position: absolute;\n      right: 5%;\n      top: 1.12rem;\n      display: block;\n      width: .34rem;\n      height: .34rem;\n      border: 2px solid #B00600;\n      transform: rotate(45deg);\n      border-left: none;\n      border-bottom: none; }\n  .deficiency .bottom {\n    width: 100%;\n    -webkit-box-flex: 1;\n    position: relative;\n    display: none; }\n    .deficiency .bottom h3 {\n      width: 100%;\n      height: 1rem;\n      background: #F6514B;\n      text-align: center;\n      color: #fff;\n      font-size: .35rem;\n      line-height: 1rem;\n      font-weight: 100; }\n    .deficiency .bottom .on_arrow {\n      width: 0;\n      height: 0;\n      border: 7px solid transparent;\n      border-bottom-color: #fff;\n      position: absolute;\n      left: 50%;\n      top: .72rem; }\n    .deficiency .bottom .info_content {\n      width: 100%;\n      -webkit-box-flex: 1; }\n      .deficiency .bottom .info_content .info_top {\n        width: 100%;\n        padding: 0 5%; }\n        .deficiency .bottom .info_content .info_top span {\n          float: left;\n          display: inline-block;\n          line-height: .5rem;\n          font-size: 12px; }\n        .deficiency .bottom .info_content .info_top p {\n          width: 70%;\n          float: left;\n          line-height: .5rem;\n          font-size: 12px; }\n      .deficiency .bottom .info_content .read {\n        clear: both;\n        font-size: .26rem;\n        display: block;\n        width: 100%;\n        height: .84rem;\n        line-height: .84rem;\n        text-align: center; }\n      .deficiency .bottom .info_content .info_bot {\n        width: 100%;\n        padding: 0 5%;\n        display: none; }\n        .deficiency .bottom .info_content .info_bot h4 {\n          line-height: .6rem;\n          font-size: 14px;\n          font-weight: 400; }\n          .deficiency .bottom .info_content .info_bot h4 i {\n            display: inline-block;\n            width: .17rem;\n            height: .17rem;\n            margin-right: .07rem; }\n            .deficiency .bottom .info_content .info_bot h4 i img {\n              width: 100%;\n              height: 100%; }\n        .deficiency .bottom .info_content .info_bot ul li {\n          font-size: 12px;\n          background: url(" + __webpack_require__(20) + ") no-repeat left center; }\n          .deficiency .bottom .info_content .info_bot ul li a {\n            margin-left: .2rem; }\n  .deficiency .container {\n    width: 100%;\n    height: 100%;\n    -webkit-box-flex: 1;\n    overflow-y: auto; }\n    .deficiency .container .suit_title {\n      width: 100%;\n      height: .86rem;\n      border-top: 1px solid #ccc; }\n      .deficiency .container .suit_title h2 {\n        width: 95%;\n        height: .86rem;\n        line-height: .86rem;\n        color: #F6514B;\n        margin-left: 5%;\n        font-weight: 400;\n        font-size: .24rem; }\n    .deficiency .container .suit_content {\n      border-top: 1px solid #ccc;\n      display: -webkit-flex;\n      -webkit-flex-wrap: wrap;\n      width: 100%;\n      height: 7.6rem;\n      display: none; }\n      .deficiency .container .suit_content dl {\n        float: left;\n        width: 45%;\n        height: 3.72rem;\n        margin-left: 3%; }\n        .deficiency .container .suit_content dl dt {\n          width: 100%;\n          height: auto; }\n          .deficiency .container .suit_content dl dt img {\n            width: 100%;\n            height: 100%; }\n        .deficiency .container .suit_content dl dd {\n          text-align: center;\n          line-height: .6rem;\n          font-size: .28rem; }\n    .deficiency .container .unsuit_title {\n      width: 100%;\n      height: .86rem;\n      border-top: 1px solid #ccc; }\n      .deficiency .container .unsuit_title h2 {\n        width: 95%;\n        height: .86rem;\n        line-height: .86rem;\n        color: #F6514B;\n        margin-left: 5%;\n        font-weight: 400;\n        font-size: .24rem; }\n    .deficiency .container .unsuit_content {\n      border-top: 1px solid #ccc;\n      display: -webkit-flex;\n      -webkit-flex-wrap: wrap;\n      width: 100%;\n      height: 7.6rem;\n      display: none; }\n      .deficiency .container .unsuit_content dl {\n        width: 45%;\n        height: 3.72rem;\n        margin-left: 3%;\n        float: left; }\n        .deficiency .container .unsuit_content dl dt {\n          width: 100%;\n          height: auto; }\n          .deficiency .container .unsuit_content dl dt img {\n            width: 100%;\n            height: 100%; }\n        .deficiency .container .unsuit_content dl dd {\n          text-align: center;\n          line-height: .6rem;\n          font-size: .28rem; }\n", ""]);

	// exports


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhBwAHAKIAADMzM+Xl5bKysv///8zMzPLy8v///wAAACH5BAEHAAYALAAAAAAHAAcAAAMUOFMUOgJIsaQNxEpSNHDR9DDOkAAAOw=="

/***/ }
]);