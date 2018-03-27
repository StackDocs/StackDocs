/*global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
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


export const addEventListener = () => {
  const highlightedElements = document.getElementsByClassName('chromelights-highlights');

  for (let i = 0; i < highlightedElements.length; i++) {
    highlightedElements[i].addEventListener('click', () => {
      // console.log(event.target.innerText);
      const self = highlightedElements[i];

      const alreadyActive = document.getElementsByClassName('activeHighlight');

      highlightedElements[i].classList.toggle('activeHighlight');

      for (let j = 0; j < alreadyActive.length; j++) {
        if (alreadyActive[j] !== self) {
          console.log('alreadyActive !== self');
          alreadyActive[j].classList.remove('activeHighlight');
        }
      }
    });
  }
};

document.addEventListener('click', ({target}) => {

})

