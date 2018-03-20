import React from 'react'
import ReactDOM from 'react-dom'

import Sidebar from '~/chrome/Sidebar';

import { findToHighlight, createHighlightedObj } from './highlighting';

let sidebarExpanded = false;

chrome.runtime.onMessage.addListener(function (request) {
  if (request.callFunction === 'toggleSidebar') {
    toggleSidebar();
  }
});

function toggleSidebar() {
  if (sidebarExpanded) {
    const el = document.getElementById('chromelights-sidebar');
    el.parentNode.removeChild(el);
    sidebarExpanded = false;
  } else {
    const sidebar = document.createElement('div');
    sidebar.id = 'chromelights-sidebar';
    sidebar.className = 'animated slideInRight';
    document.body.appendChild(sidebar);
    sidebarExpanded = true;
    ReactDOM.render(<Sidebar />, document.getElementById('chromelights-sidebar'));
  }
}

//this is just hardcoded at the moment, for testing purposes
const pathOne = '#answer-27664932 > .post-layout > .answercell > .post-text > :nth-child(2) > code';
const str1 = 'git';

findToHighlight(pathOne, str1);

document.addEventListener('mouseup', createHighlightedObj);
