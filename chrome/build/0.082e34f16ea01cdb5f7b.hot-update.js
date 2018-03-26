webpackHotUpdate(0,{

/***/ "./chrome/src/components/CreateHighlightButton.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CreateHighlightButton */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./chrome/node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fire__ = __webpack_require__("./fire/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__("./chrome/node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__("./chrome/node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mark_js__ = __webpack_require__("./chrome/node_modules/mark.js/dist/mark.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mark_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mark_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__highlighting__ = __webpack_require__("./chrome/src/highlighting.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chrome_src_store__ = __webpack_require__("./chrome/src/store/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var CreateHighlightButton = function (_Component) {
  _inherits(CreateHighlightButton, _Component);

  function CreateHighlightButton(props) {
    _classCallCheck(this, CreateHighlightButton);

    var _this = _possibleConstructorReturn(this, (CreateHighlightButton.__proto__ || Object.getPrototypeOf(CreateHighlightButton)).call(this, props));

    _this.handleChange = function () {
      return _this.__handleChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {};
    _this.onHighlightClick = _this.onHighlightClick.bind(_this);
    return _this;
  }

  _createClass(CreateHighlightButton, [{
    key: "__handleChange__REACT_HOT_LOADER__",
    value: function __handleChange__REACT_HOT_LOADER__() {
      return this.__handleChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: "__handleChange__REACT_HOT_LOADER__",
    value: function __handleChange__REACT_HOT_LOADER__(event) {
      event.preventDefault();
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "onHighlightClick",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var highlightObj, markInstance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                event.preventDefault();
                highlightObj = Object(__WEBPACK_IMPORTED_MODULE_5__highlighting__["a" /* createHighlightedObj */])();

                if (this.props.highlightObj ? this.props.highlightObj.markInstance : false) this.props.markInstance.unmark();
                _context.next = 6;
                return new __WEBPACK_IMPORTED_MODULE_4_mark_js___default.a(highlightObj.domPath);

              case 6:
                markInstance = _context.sent;

                highlightObj ? this.props.storeHighlight({
                  highlightObj: highlightObj,
                  markInstance: markInstance,
                  highlightText: highlightObj.newString
                }, function () {
                  markInstance.mark(highlightObj.newString, {
                    acrossElements: true,
                    separateWordSearch: false,
                    className: "chromelights-highlights"
                  });
                }) : console.log("nothing selected");
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                console.error(_context.t0);

              case 13:
                this.props.setView('askOrAnnotate');

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function onHighlightClick(_x) {
        return _ref.apply(this, arguments);
      }

      return onHighlightClick;
    }()
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "button",
          { className: "chromelights-btn", onClick: this.onHighlightClick },
          "Create a Highlight"
        )
      );
    }
  }]);

  return CreateHighlightButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);
var MapState = function MapState(_ref2) {
  var highlight = _ref2.highlight;

  var highlightObj = highlight.highlightObj;
  var markInstance = highlight.markInstance;
  return { highlightObj: highlightObj, markInstance: markInstance };
};

var MapDispatch = function MapDispatch(dispatch) {
  return {
    storeHighlight: function storeHighlight(highlight) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__chrome_src_store__["a" /* createHighlight */])(highlight));
    }
  };
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_3_react_redux__["b" /* connect */])(MapState, MapDispatch)(CreateHighlightButton);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CreateHighlightButton, "CreateHighlightButton", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlightButton.jsx");

  __REACT_HOT_LOADER__.register(MapState, "MapState", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlightButton.jsx");

  __REACT_HOT_LOADER__.register(MapDispatch, "MapDispatch", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlightButton.jsx");

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlightButton.jsx");
}();

;

/***/ })

})
//# sourceMappingURL=0.082e34f16ea01cdb5f7b.hot-update.js.map