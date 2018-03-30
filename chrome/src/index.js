/*global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rxjs';
// import Mark from 'mark.js';

import Sidebar from '~/chrome/Sidebar';

import { createHighlightedObj } from './highlighting';

let sidebarExpanded = false;
let sidebarInTransition = false;

chrome.runtime.onMessage.addListener(function (request) {
  if (request.callFunction === 'toggleSidebar') {
    toggleSidebar(request.currentUser);
  }
});

export function toggleSidebar(user) {
  if (!sidebarInTransition && sidebarExpanded) {
    sidebarInTransition = true;
    const sidebar = document.getElementById('chromelights-sidebar');
    sidebar.className = 'animated slideOutRight';
    sidebarExpanded = false;
    setTimeout(() => {
    sidebar.parentNode.removeChild(sidebar);
    sidebarInTransition = false;
    }, 500);

  } else if (!sidebarInTransition) {
    sidebarInTransition = true;
    const sidebar = document.createElement('div');
    sidebar.id = 'chromelights-sidebar';
    sidebar.className = 'animated slideInRight';
    document.body.appendChild(sidebar);
    sidebarExpanded = true;
    setTimeout(() => {
      sidebarInTransition = false;
    }, 500);
    ReactDOM.render(<Sidebar user={user} />, document.getElementById('chromelights-sidebar'));
  }
}

document.addEventListener('mouseup', createHighlightedObj);

//Sort
export const sortByVote = array => {
  const updatedOrder = [];
  array.forEach(entry => {
    for (var i = 0; i < array.length; i++) {
      if (!updatedOrder[i] || entry[1].score >= updatedOrder[i][1].score) {
        updatedOrder.splice(i, 0, entry);
        break;
      }
    }
  });
  return updatedOrder;
};

export const watch = ref => Rx.Observable.create(obs => ref.onSnapshot(obs));
