webpackHotUpdate(0,{

/***/ "./chrome/src/containers/HighlightAnnotations.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./chrome/node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fireview__ = __webpack_require__("./chrome/node_modules/fireview/dist/fireview.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fireview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fireview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fire__ = __webpack_require__("./fire/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Annotations__ = __webpack_require__("./chrome/src/components/Annotations.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Interactive__ = __webpack_require__("./chrome/src/components/Interactive.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_CreateHighlightButton__ = __webpack_require__("./chrome/src/components/CreateHighlightButton.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__highlighting__ = __webpack_require__("./chrome/src/highlighting.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var HighlightAnnotations = function (_Component) {
  _inherits(HighlightAnnotations, _Component);

  function HighlightAnnotations(props) {
    _classCallCheck(this, HighlightAnnotations);

    //get the active highlight (most recently clicked)
    // const selected = document.getElementsByClassName('activeHighlight')[0];
    // get an array of classes on it
    // const selectedClasses = selected.className.split(' ');
    // const selectedId = selectedClasses.filter(el => {
    //   return el !== 'activeHighlight' && el !== 'chromelights-highlights';
    // });

    /* the selectedId should be used to find and render all of the
         annotations associated with the selected highlight */

    // console.log('classes', selectedId);

    var _this = _possibleConstructorReturn(this, (HighlightAnnotations.__proto__ || Object.getPrototypeOf(HighlightAnnotations)).call(this, props));

    _this.state = {
      selectedHighlight: _this.props.activeId || 'Select Some Text'
    };
    return _this;
  }

  _createClass(HighlightAnnotations, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.activeId) {
        this.setState({ selectedHighlight: newProps.activeId });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var urlReadOnly = document.location.href;
      var url = Object(__WEBPACK_IMPORTED_MODULE_6__highlighting__["b" /* urlEncode */])(urlReadOnly);
      var setView = this.props.setView;
      console.log('PROPS IN HIGHLIGHTANNOTATIONS: ', this.props);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { id: 'highlight-annotation' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'chromelights-highlight-header' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'chromelights-highlight-container' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h3',
              { className: 'chromelights-highlight-title' },
              '...' + this.state.selectedHighlight + '...'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_CreateHighlightButton__["a" /* default */], { setView: setView })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_fireview__["Map"], {
          each: true,
          from: __WEBPACK_IMPORTED_MODULE_2__fire__["c" /* firestore */].collection('UrlPages').doc(url).collection('highlights').doc(this.state.selectedHighlight).collection('entries'),
          Loading: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            null,
            'Loading...'
          ),
          Empty: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            { color: 'red' },
            'No Annotations'
          ),
          Render: function Render(_ref) {
            var upVote = _ref.upVote,
                downVote = _ref.downVote,
                content = _ref.content,
                comments = _ref.comments,
                user = _ref.user,
                date = _ref.date,
                title = _ref.title;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h3',
                null,
                title
              ),
              console.log(typeof date === 'undefined' ? 'undefined' : _typeof(date)),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Annotations__["a" /* default */], {
                content: content,
                user: user,
                date: 'March 20, 2018'
              }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Interactive__["a" /* default */], {
                downVote: downVote,
                upVote: upVote,
                comments: comments
              })
            );
          }
        })
      );
    }
  }]);

  return HighlightAnnotations;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

var _default = HighlightAnnotations;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(HighlightAnnotations, 'HighlightAnnotations', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/containers/HighlightAnnotations.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/containers/HighlightAnnotations.jsx');
}();

;

/***/ })

})
//# sourceMappingURL=0.06fd1dac1daca20be836.hot-update.js.map