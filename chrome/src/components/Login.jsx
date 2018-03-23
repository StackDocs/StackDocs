import React from 'react';
import { loginWithGoogle } from '../options.js';
import firebase, {auth} from '~/fire';


export default function Login(props) {
  console.log('localStorage', localStorage.userId);

  const setView = props.setView;
  return (
    <div id="login-btn">
      <button onClick={loginWithGoogle}>Login With Google</button>
    </div>
  );
}
