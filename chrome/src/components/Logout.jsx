/* global chrome */

import React from 'react';
// import { oAuthGoogle } from '../options.js';
import firebase, { auth } from '~/fire';
import { toggleSidebar } from '../index';


export default function Logout() {

  const handleClick = () => {
    chrome.runtime.sendMessage({callFunction: 'logout'}, function(response) {
      return toggleSidebar();
    });
  };

  return (
    <div id="logout-btn">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
