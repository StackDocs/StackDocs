import React from 'react';
import ReactDOM from 'react-dom';
import Mark from 'mark.js';

import Sidebar from '~/chrome/Sidebar';

import { findToHighlight, createHighlightedObj } from './highlighting';

let sidebarExpanded = false;
let sidebarInTransition = false;

chrome.runtime.onMessage.addListener(function (request) {
  if (request.callFunction === 'toggleSidebar') {
    toggleSidebar();
  }
});

function toggleSidebar() {
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
    ReactDOM.render(<Sidebar />, document.getElementById('chromelights-sidebar'));
  }
}

//this is just hardcoded at the moment, for testing purposes
const pathOne = '.manual-user-index > :nth-child(5)';
const str1 = 'git';

// findToHighlight(pathOne, str1);

const markInstance = new Mark(pathOne);
console.log('hard coded pathOne: ', pathOne);
markInstance.mark('Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.', { acrossElements: true, separateWordSearch: false, className: 'chromelights-highlights'});


document.addEventListener('mouseup', createHighlightedObj);

const highlightedElements = document.getElementsByClassName('chromelights-highlights');
for (let i = 0; i < highlightedElements.length; i++) {
  highlightedElements[i].addEventListener('click', () => {
    console.log('You clicked highlighted text!');
  });
}

