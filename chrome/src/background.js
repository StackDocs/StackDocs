/* global chrome */
import { oAuthGoogle } from './options';
import { auth } from '~/fire';

chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
  chrome.pageAction.show(tab.id);
});

chrome.pageAction.onClicked.addListener(async function(tab) {
  if (!auth.currentUser) await oAuthGoogle();

  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(
      tab.id,
      {callFunction: 'toggleSidebar'},
      function(response) {
      }
    );
  });
});

chrome.runtime.onMessage.addListener(function (request) {
  if (request.callFunction === 'logout') {
    console.log('before sign out');
    auth.signOut();
    console.log('running in background');
  }
});

