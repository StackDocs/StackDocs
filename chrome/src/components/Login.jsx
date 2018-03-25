/* global chrome */

import React from 'react';
import { oAuthGoogle } from '../options.js';
// import firebase, {auth} from '~/fire';


export default function Login() {

  return (
    <div id="login-btn">
      <button onClick={oAuthGoogle}>Login With Google</button>
    </div>
  );
}
