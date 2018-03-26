webpackHotUpdate(0,{

/***/ "./chrome/Sidebar.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./chrome/node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_shadow__ = __webpack_require__("./chrome/node_modules/react-shadow/dist/react-shadow.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_shadow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_shadow__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Header__ = __webpack_require__("./chrome/src/components/Header.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fire__ = __webpack_require__("./fire/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mark_js__ = __webpack_require__("./chrome/node_modules/mark.js/dist/mark.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mark_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mark_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_containers_HighlightAnnotations__ = __webpack_require__("./chrome/src/containers/HighlightAnnotations.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_AskOrAnnotate__ = __webpack_require__("./chrome/src/components/AskOrAnnotate.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_CreateHighlights__ = __webpack_require__("./chrome/src/components/CreateHighlights.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_components_Login__ = __webpack_require__("./chrome/src/components/Login.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_shadow_css__ = __webpack_require__("./chrome/src/shadow.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_shadow_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__src_shadow_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_highlighting__ = __webpack_require__("./chrome/src/highlighting.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_index_js__ = __webpack_require__("./chrome/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_redux__ = __webpack_require__("./chrome/node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__chrome_src_store__ = __webpack_require__("./chrome/src/store/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








// import FindHighlights from './src/components/FindHighlights';






// Redux



var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this.state = {
      view: '',
      isQuestion: true,
      user: '',
      activeId: ''
    };

    document.addEventListener('click', function () {
      if (document.getElementsByClassName('activeHighlight').length) {
        var activeId = document.getElementsByClassName('activeHighlight')[0].classList[1];
        _this.setState({ activeId: activeId }, function () {
          // console.log('state inside', this.state);
        });
      }
    });

    _this.setView = _this.setView.bind(_this);
    _this.selectEntryType = _this.selectEntryType.bind(_this);
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      fetchHighlights();
      console.log('component mounting....');
    }
  }, {
    key: 'setView',
    value: function setView(view) {
      this.setState({
        view: view
      });
    }

    //add components that are rendered depending on views here:
    //to redirect switch views from your component pass the setView as props
    //and change the view in your component's button, form etc.

  }, {
    key: 'selectComponents',
    value: function selectComponents() {
      switch (this.state.view) {
        case 'login':
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__src_components_Login__["a" /* default */], null);
        case 'home':
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__src_components_CreateHighlights__["a" /* default */], null);
        case 'askOrAnnotate':
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__src_components_AskOrAnnotate__["a" /* default */], { selectEntryType: this.selectEntryType });
        case 'submission':
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__src_components_CreateHighlights__["a" /* default */], { setView: this.setView, isQuestion: this.state.isQuestion });
        default:
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__src_containers_HighlightAnnotations__["a" /* default */], { setView: this.setView, activeId: this.state.activeId });
      }
    }
  }, {
    key: 'selectEntryType',
    value: function selectEntryType(evt) {
      evt.preventDefault();
      var type = evt.target.value;
      this.setState({
        isQuestion: type,
        view: 'submission'
      });
      console.log('state: ', this.state);
    }

    //components that will always show got here in the render
    //components that will be only rendered in certain views
    //go above in the selectComponents functions' switch statement

  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_shadow___default.a,
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_12_react_redux__["a" /* Provider */],
            { store: __WEBPACK_IMPORTED_MODULE_13__chrome_src_store__["b" /* default */] },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'style',
                { type: 'text/css' },
                __WEBPACK_IMPORTED_MODULE_9__src_shadow_css___default.a
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__src_components_Header__["a" /* default */], { setView: this.setView }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'chromelights-main' },
                this.selectComponents()
              )
            )
          )
        )
      );
    }
  }]);

  return Sidebar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

var _default = Sidebar;
/* harmony default export */ __webpack_exports__["a"] = (_default);


var hlArr = [];
var UrlPages = __WEBPACK_IMPORTED_MODULE_3__fire__["c" /* firestore */].collection('UrlPages');

var fetchHighlights = function fetchHighlights() {
  var encodedDocUrl = Object(__WEBPACK_IMPORTED_MODULE_10__src_highlighting__["b" /* urlEncode */])(document.location.href);
  //console.log('encoded URL:', encodedDocUrl);
  UrlPages.doc(encodedDocUrl).collection('highlights').get().then(function (querySnapshot) {
    //console.log('querysnapshot: ', querySnapshot);
    querySnapshot.forEach(function (highlight) {
      // console.log('highlight: ', highlight);
      hlArr.push([highlight.data(), highlight.id]);
    });
    return 'next';
  }).then(function () {
    // console.log('highlight arr: ', hlArr);
    hlArr.map(function (hl) {
      // console.log('in hl map', hl[1], hl[0]);
      var markInstance = new __WEBPACK_IMPORTED_MODULE_4_mark_js___default.a(hl[0].domPath);
      markInstance.mark(hl[0].newString, {
        acrossElements: true,
        separateWordSearch: false,
        className: 'chromelights-highlights ' + hl[1]
      });
    });
  }).then(function () {
    Object(__WEBPACK_IMPORTED_MODULE_11__src_index_js__["addEventListener"])();
  }).catch(function (error) {
    return console.log('error: ', error);
  });
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Sidebar, 'Sidebar', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/Sidebar.jsx');

  __REACT_HOT_LOADER__.register(hlArr, 'hlArr', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/Sidebar.jsx');

  __REACT_HOT_LOADER__.register(UrlPages, 'UrlPages', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/Sidebar.jsx');

  __REACT_HOT_LOADER__.register(fetchHighlights, 'fetchHighlights', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/Sidebar.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/domnik/Desktop/fsa-senior/chromelights/chrome/Sidebar.jsx');
}();

;

/***/ })

})
//# sourceMappingURL=0.4de4456f7cfe9557ce36.hot-update.js.map