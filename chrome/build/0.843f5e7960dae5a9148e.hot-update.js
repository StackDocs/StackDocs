webpackHotUpdate(0,{

/***/ "./chrome/src/components/CreateHighlights.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CreateHighlights */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./chrome/node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__("./chrome/node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__("./chrome/node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fire__ = __webpack_require__("./fire/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mark_js__ = __webpack_require__("./chrome/node_modules/mark.js/dist/mark.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_mark_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_mark_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__highlighting__ = __webpack_require__("./chrome/src/highlighting.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








//Firestore
var Annotations = __WEBPACK_IMPORTED_MODULE_3__fire__["c" /* firestore */].collection("Annotations");
var UrlPages = __WEBPACK_IMPORTED_MODULE_3__fire__["c" /* firestore */].collection("UrlPages");
var Entries = __WEBPACK_IMPORTED_MODULE_3__fire__["c" /* firestore */].collection("Entries");

var CreateHighlights = function (_Component) {
  _inherits(CreateHighlights, _Component);

  function CreateHighlights(props) {
    _classCallCheck(this, CreateHighlights);

    var _this = _possibleConstructorReturn(this, (CreateHighlights.__proto__ || Object.getPrototypeOf(CreateHighlights)).call(this, props));

    _this.handleChange = function () {
      return _this.__handleChange__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onSubmit = function () {
      return _this.__onSubmit__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {
      message: "",
      highlightText: "highlight text to create a comment!",
      highlightObj: {},
      markInstance: ""
    };
    return _this;
  }

  _createClass(CreateHighlights, [{
    key: "__onSubmit__REACT_HOT_LOADER__",
    value: function __onSubmit__REACT_HOT_LOADER__() {
      return this.__onSubmit__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: "__handleChange__REACT_HOT_LOADER__",
    value: function __handleChange__REACT_HOT_LOADER__() {
      return this.__handleChange__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        message: "",
        highlightText: "highlight text to create a comment!",
        highlightObj: {},
        markInstance: ""
      });
    }
  }, {
    key: "__handleChange__REACT_HOT_LOADER__",


    // PLEASE DO NOT ERASE THIS - Thanks (Fran)
    // async onHighlightClick(event) {
    //   try {
    //     event.preventDefault();
    //     const highlightObj = createHighlightedObj();
    //     if (this.state.markInstance) this.state.markInstance.unmark();
    //     const markInstance = await new Mark(highlightObj.domPath);
    //     this.setState(
    //       {
    //         highlightObj,
    //         markInstance,
    //         highlightText: highlightObj.newString
    //       },
    //       () => {
    //         markInstance.mark(this.state.highlightObj.newString, {
    //           acrossElements: true,
    //           separateWordSearch: false,
    //           className: "chromelights-highlights"
    //         });
    //       }
    //     );
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

    value: function __handleChange__REACT_HOT_LOADER__(event) {
      event.preventDefault();
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "__onSubmit__REACT_HOT_LOADER__",
    value: function __onSubmit__REACT_HOT_LOADER__(event) {
      var _this2 = this;

      event.preventDefault();
      var setView = this.props.setView;
      var _props$highlightObj = this.props.highlightObj,
          newString = _props$highlightObj.newString,
          domPath = _props$highlightObj.domPath,
          url = _props$highlightObj.url;

      var submitUrl = Object(__WEBPACK_IMPORTED_MODULE_5__highlighting__["b" /* urlEncode */])(url);
      var messageSubmit = this.state.message;
      var newFireHL = {
        newString: newString,
        domPath: domPath,
        submitUrl: submitUrl
      };
      console.log("newFireHL", newFireHL);

      UrlPages.doc(submitUrl).collection("highlights").add(newFireHL).then(function (highlight) {
        UrlPages.doc(submitUrl).collection("highlights").doc(highlight.id).collection("entries").add({
          isQuestion: _this2.props.isQuestion,
          upVote: 0,
          downVote: 0,
          content: messageSubmit,
          highlightID: highlight.id,
          comments: [],
          user: "Tom",
          date: new Date(),
          title: "TBD"
        });
      }).then(function () {
        setView("");
      }).catch(function (error) {
        return console.log("error: ", error);
      });
      this.state;
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "chromelights-highlight-container" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "h3",
            { className: "highlight-title" },
            this.props.highlightText
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "h5",
          null,
          "User name, data "
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "message-form" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "form",
            { onSubmit: this.onSubmit },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
              type: "text",
              name: "message",
              className: "message-field-wide",
              onChange: this.handleChange,
              value: this.state.message
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "submit", value: "Submit" })
          )
        )
      );
    }
  }]);

  return CreateHighlights;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

var MapState = function MapState(_ref) {
  var highlight = _ref.highlight;

  var highlightObj = highlight.highlightObj;
  var highlightText = highlight.highlightText;
  return { highlightObj: highlightObj, highlightText: highlightText };
};

var MapDispatch = null;

var _default = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(MapState, MapDispatch)(CreateHighlights);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Annotations, "Annotations", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlights.jsx");

  __REACT_HOT_LOADER__.register(UrlPages, "UrlPages", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlights.jsx");

  __REACT_HOT_LOADER__.register(Entries, "Entries", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlights.jsx");

  __REACT_HOT_LOADER__.register(CreateHighlights, "CreateHighlights", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlights.jsx");

  __REACT_HOT_LOADER__.register(MapState, "MapState", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlights.jsx");

  __REACT_HOT_LOADER__.register(MapDispatch, "MapDispatch", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlights.jsx");

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/domnik/Desktop/fsa-senior/chromelights/chrome/src/components/CreateHighlights.jsx");
}();

;

/***/ })

})
//# sourceMappingURL=0.843f5e7960dae5a9148e.hot-update.js.map