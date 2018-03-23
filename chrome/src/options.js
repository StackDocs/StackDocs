console.log('hello')

import firebase, {auth} from '~/fire';

const google = new firebase.auth.GoogleAuthProvider;

auth.onAuthStateChanged(user => {
  if (user) {
    const userName = user.displayName;
    const userId = user.uid;
    localStorage["userId"] = userId;
    return console.log(user);
  }
  auth.signInWithRedirect(google);
});
