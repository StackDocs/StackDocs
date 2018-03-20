webpackHotUpdate(0,{

/***/ "./chrome/src/background.js":
/***/ (function(module, exports) {

chrome.tabs.onUpdated.addListener(function (tabId) {
  chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function (tab) {
  chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(tab.id, { callFunction: 'toggleSidebar' }, function (response) {});
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ })

})
//# sourceMappingURL=0.d3df77ee021cf400de6f.hot-update.js.map