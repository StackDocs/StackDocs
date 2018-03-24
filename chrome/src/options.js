/* global chrome */

console.log('hello');

import firebase, {auth} from '~/fire';

const google = new firebase.auth.GoogleAuthProvider;

export const oAuthGoogle = () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      const userName = user.displayName;
      // const userId = user.uid;
      localStorage.setItem('userName', userName);
      return;
    }
    auth.signInWithRedirect(google)
    .then((result) => {
      localStorage.setItem('user', result);
      console.log(result);
    });
  });
}
