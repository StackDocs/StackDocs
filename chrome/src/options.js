/* global chrome */

console.log('hello');

import firebase, {auth} from '~/fire';

const google = new firebase.auth.GoogleAuthProvider;

export const oAuthGoogle = () =>
  auth.signInWithPopup(google)
  .then((result) => {
    console.log(result);
    // chrome.storage.sync.set({
    //   result: result.uid
    // })
  });

window.auth = auth;

