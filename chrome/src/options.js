console.log('hello')

import firebase, {auth} from '~/fire';

const google = new firebase.auth.GoogleAuthProvider;

auth.onAuthStateChanged(user => {
  if (user) return console.log(user.uid);
  auth.signInWithPopup(google);
})
