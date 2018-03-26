webpackHotUpdate(0,{

/***/ "./chrome/src/components/AskOrAnnotate.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AskOrAnnotate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./chrome/node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__("./chrome/node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_svg_react_loader_name_QuestionIcon_chrome_src_icons_question_circle_svg__ = __webpack_require__("./node_modules/svg-react-loader/lib/loader.js?name=QuestionIcon!./chrome/src/icons/question-circle.svg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_svg_react_loader_name_QuestionIcon_chrome_src_icons_question_circle_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_svg_react_loader_name_QuestionIcon_chrome_src_icons_question_circle_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_svg_react_loader_name_AnnotationIcon_chrome_src_icons_exclamation_circle_svg__ = __webpack_require__("./node_modules/svg-react-loader/lib/loader.js?name=AnnotationIcon!./chrome/src/icons/exclamation-circle.svg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_svg_react_loader_name_AnnotationIcon_chrome_src_icons_exclamation_circle_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_svg_react_loader_name_AnnotationIcon_chrome_src_icons_exclamation_circle_svg__);





function AskOrAnnotate(props) {
  var selectEntryType = props.selectEntryType;
  console.log(props.highlightObj, "highlight object");
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'chromelights-ask-or-annotate' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_svg_react_loader_name_QuestionIcon_chrome_src_icons_question_circle_svg___default.a, { className: 'chromelights-big-icon' }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'button',
      { className: 'chromelights-btn chromelights-question-icon', onClick: selectEntryType, value: true },
      'Ask'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'chromelights-or' },
      'or'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_svg_react_loader_name_AnnotationIcon_chrome_src_icons_exclamation_circle_svg___default.a, { className: 'chromelights-big-icon chromelight-annotation-icon' }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'button',
      { className: 'chromelights-btn', onClick: selectEntryType, value: false },
      'Annotate'
    )
  );
}

var MapState = function MapState(_ref) {
  var highlight = _ref.highlight;

  var highlightObj = highlight.highlightObj;
  return { highlightObj: highlightObj };
};

var MapDispatch = null;

var _default = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(MapState, MapDispatch)(AskOrAnnotate);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AskOrAnnotate, 'AskOrAnnotate', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/AskOrAnnotate.jsx');

  __REACT_HOT_LOADER__.register(MapState, 'MapState', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/AskOrAnnotate.jsx');

  __REACT_HOT_LOADER__.register(MapDispatch, 'MapDispatch', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/AskOrAnnotate.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/AskOrAnnotate.jsx');
}();

;

/***/ })

})
//# sourceMappingURL=0.b67414bd2bd40e14ee77.hot-update.js.map