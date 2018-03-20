webpackHotUpdate(0,{

/***/ "./chrome/src/containers/HighlightAnnotations.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fireview__ = __webpack_require__("./node_modules/fireview/dist/fireview.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fireview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fireview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fire__ = __webpack_require__("./fire/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_HighlightedText__ = __webpack_require__("./chrome/src/components/HighlightedText.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_HighlightedText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_HighlightedText__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Annotations__ = __webpack_require__("./chrome/src/components/Annotations.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Interactive__ = __webpack_require__("./chrome/src/components/Interactive.jsx");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var _default = function (_Component) {
    _inherits(_default, _Component);

    function _default(props) {
        var _this;

        _classCallCheck(this, _default);

        (_this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props)), _this), _this.state = {
            selectedHighlight: _this.props.highlight || 'beforeDestroy Hooks'
        };
        return _this;
    }

    _createClass(_default, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { id: 'highlight-annotation' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h1',
                    { className: 'highlight-title' },
                    this.state.selectedHighlight
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_fireview__["Map"], { each: true, from: __WEBPACK_IMPORTED_MODULE_2__fire__["a" /* firestore */].collection('Annotations').where('highlight', '==', this.state.selectedHighlight),
                    Loading: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h3',
                        null,
                        'Loading...'
                    ),
                    Empty: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h3',
                        null,
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
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Annotations__["a" /* default */], { content: content, user: user, date: date.date }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_Interactive__["a" /* default */], { downVote: downVote, upVote: upVote, comments: comments })
                        );
                    }
                })
            );
        }
    }]);

    return _default;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/fran/Fullstack Senior/chromelights/chrome/src/containers/HighlightAnnotations.jsx');
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
    var sidebar = document.createElement('iframe');
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
//# sourceMappingURL=0.e56a0ec3837cbfa0336e.hot-update.js.map