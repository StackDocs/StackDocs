/* global chrome */

// console.log('hello')

// import firebase, {auth} from '~/fire';

// const google = new firebase.auth.GoogleAuthProvider;

// export const loginWithGoogle = () => {
//   auth.onAuthStateChanged(user => {
//     if (user) {
//       // const userName = user.displayName;
//       const userId = user.uid;
//       chrome.storage.local.set({'user': userId}, () => {
//         console.log(user);
//       });
//       return;
//     }
//     auth.signInWithRedirect(google)
//     .then((result) => {
//       chrome.storage.local.set({'user': result.displayName});
//       console.log(result);
//     });
//   });
// };
