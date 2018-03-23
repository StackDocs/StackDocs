/* global chrome */

import React from 'react';
import { loginWithGoogle } from '../index.js';
import firebase, {auth} from '~/fire';


export default function Login(props) {
  chrome.storage.local.get('user', (result) => {
    console.log('storage', result);
  });

  // const setView = props.setView;
  return (
    <div id="login-btn">
      <button onClick={loginWithGoogle}>Login With Google</button>
    </div>
  );
}
