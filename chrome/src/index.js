import React from 'react';
import ReactDOM from 'react-dom';
import Mark from 'mark.js';

import Sidebar from '~/chrome/Sidebar';

import { createHighlightedObj } from './highlighting';

let sidebarExpanded = false;
let sidebarInTransition = false;

chrome.runtime.onMessage.addListener(function (request) {
  if (request.callFunction === 'toggleSidebar') {
    toggleSidebar();
  }
});

function toggleSidebar() {
  const activeHighlights = document.getElementsByClassName('activeHighlight');
  if (activeHighlights.length) return;

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
const pathTwo = '#example-usage';

const str1 = 'Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.';
const str2 = 'Example Usage';

const markInstance = new Mark(pathOne);
console.log('hard coded pathOne: ', pathOne);
markInstance.mark(str1, {
  acrossElements: true,
  separateWordSearch: false,
  className: 'chromelights-highlights'
});

const markInstance2 = new Mark(pathTwo);

markInstance2.mark(str2, {
  acrossElements: true,
  separateWordSearch: false,
  className: 'chromelights-highlights'
});

document.addEventListener('mouseup', createHighlightedObj);

const highlightedElements = document.getElementsByClassName('chromelights-highlights');
for (let i = 0; i < highlightedElements.length; i++) {
  highlightedElements[i].addEventListener('click', (event) => {
    console.log(event.target.innerText);
    toggleSidebar();

    const alreadyActive = document.getElementsByClassName('activeHighlight');

    for (let j = 0; j < alreadyActive.length; j++) {
      alreadyActive[j].classList.remove('activeHighlight');
    }

    highlightedElements[i].classList.toggle('activeHighlight');
  });
}
