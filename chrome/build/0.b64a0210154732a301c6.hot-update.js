webpackHotUpdate(0,{

/***/ "./chrome/Sidebar.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_header__ = __webpack_require__("./chrome/src/components/header.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_containers_HighlightAnnotations__ = __webpack_require__("./chrome/src/containers/HighlightAnnotations.jsx");




var App = function App() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'iframe',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__src_components_header__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__src_containers_HighlightAnnotations__["a" /* default */], null)
  );
};

var _default = App;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(App, 'App', '/Users/fran/Fullstack Senior/chromelights/chrome/Sidebar.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/fran/Fullstack Senior/chromelights/chrome/Sidebar.jsx');
}();

;

/***/ }),

/***/ "./chrome/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__("./node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chrome_Sidebar__ = __webpack_require__("./chrome/Sidebar.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__highlighting__ = __webpack_require__("./chrome/src/highlighting.js");







var sidebarExpanded = false;

chrome.runtime.onMessage.addListener(function (request) {
  if (request.callFunction === 'toggleSidebar') {
    toggleSidebar();
  }
});

function toggleSidebar() {
  if (sidebarExpanded) {
    var el = document.getElementById('chromelights-sidebar');
    el.parentNode.removeChild(el);
    sidebarExpanded = false;
  } else {
    var sidebar = document.createElement('div');
    sidebar.id = 'chromelights-sidebar';
    sidebar.className = 'animated slideInRight';
    document.body.appendChild(sidebar);
    sidebarExpanded = true;
    __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__chrome_Sidebar__["a" /* default */], null), document.getElementById('chromelights-sidebar'));
  }
}

//this is just hardcoded at the moment, for testing purposes
var pathOne = '#answer-27664932 > .post-layout > .answercell > .post-text > :nth-child(2) > code';
var str1 = 'git';

Object(__WEBPACK_IMPORTED_MODULE_3__highlighting__["b" /* findToHighlight */])(pathOne, str1);

document.addEventListener('mouseup', __WEBPACK_IMPORTED_MODULE_3__highlighting__["a" /* createHighlightedObj */]);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(sidebarExpanded, 'sidebarExpanded', '/Users/fran/Fullstack Senior/chromelights/chrome/src/index.js');

  __REACT_HOT_LOADER__.register(toggleSidebar, 'toggleSidebar', '/Users/fran/Fullstack Senior/chromelights/chrome/src/index.js');

  __REACT_HOT_LOADER__.register(pathOne, 'pathOne', '/Users/fran/Fullstack Senior/chromelights/chrome/src/index.js');

  __REACT_HOT_LOADER__.register(str1, 'str1', '/Users/fran/Fullstack Senior/chromelights/chrome/src/index.js');
}();

;

/***/ })

})
//# sourceMappingURL=0.b64a0210154732a301c6.hot-update.js.map