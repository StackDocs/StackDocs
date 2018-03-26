const admin = require("firebase-admin");
const seed = require('./frans-firestore-seed');
const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');

// Initialize firebase-admin.
admin.initializeApp({
  "apiKey": "AIzaSyAKaRAd1hVazZ242hd9_u3TPEBDN8AzamQ",
  "databaseURL": "https://chromelights-bb54c.firebaseio.com",
  "storageBucket": "chromelights-bb54c.appspot.com",
  "authDomain": "chromelights-bb54c.firebaseapp.com",
  "messagingSenderId": "851772945859",
  "projectId": "chromelights-bb54c"
});

const firestore = admin.firestore()
const urlPages = firestore.collection("urlPages");
  
// Import seeds.
let messagesCollection = seed.collection("messages", [
    seed.doc("threesCompany", {
        content: "Hello firestore-seed.",
        created: new Date(),
    }),
    seed.doc("happyDays", {
        content: "Good bye firestore-seed.",
        created: new Date(),
    })
]);

console.log(messagesCollection)

messagesCollection.importDocuments(admin).then(() => {
    console.log("Successfully imported documents.");
}).catch(e => {
    console.log("Failed to import documents: " + e);
});


// In order of association 
// const numUrlPages = 5;  // urlPages has many highlights
// const numHighlights = 5;  // highlight has many annotations and has many questions
const numEntries = 30; // annotation has many comments and questions has many comments
// const numComments = 10; // coments has one user, and annotation or question id

const numUsers = 30; // users has many annotation and has many questions

const manualUrlPages = [
    "en.wikipedia.org/wiki/Apple",
    "en.wikipedia.org/wiki/Banana",
    "en.wikipedia.org/wiki/Cat",
    // "en.wikipedia.org/wiki/Dog",
    // "en.wikipedia.org/wiki/Zebra"
]

const highlightIds = {
  Apple: ['3Y7xk7tGKzUaBX1AaWgc', 'keN6GRv8pHlaJFAVlNs6', 'VMVEuGSCxkp01U7rMDfk', 'ewuUFILT0epC9y9e4BRb', '8JXVjqd1TZk00j6fn9i6', 'SF9MeDTg6S9ANn59xDIV'],
  Banana: ['i22pcYH6IuIYgeucxHqD', 'ktTVfdEIwHNPQYvsQlEf', 'bps2MviUznSYtHKGP0Pt', 'lfLhoHgl2h04EKa80xcS', 'Us3Ir8Pyt7ByshXgyOcl', 'PYOnQ7Bc7DxgRvgjFqRc'],
  Cat: ['p9AiI6PqlQ0RxkVz0YdN', 'a6SY9yfFJc3tH8UZenHL', 'RMVeUa3ithBPNCjPdtrE', 'lND8UvM9519G25BBgEg4', 'oZdx96j0J8P1vxBwya9b', 'OxkaVyDgoLgj7svwMRkB'],
}

const urlEncode = url => {
  let newUrl = url.split('');
  for (let i = 0; i < 9; i++) {
    if (url.slice(i, i + 8) === 'https://') {
      newUrl.splice(i, 8);
    } else if (url.slice(i, i + 7) === 'http://') {
      newUrl.splice(i, 7);
    }
  }
  const urlUpdate = newUrl.join('');
  return urlUpdate.split('/').join('%%%');
};


const encodedUrls = manualUrlPages.map(url => urlEncode(url))
// const addUrlPage = manualUrlPages.map((url, i) => seed.doc(url,{ hightlights: []}))


// let urlPageCollection = seed.collection("urlPages", addUrlPage);


// urlPageCollection.importDocuments(admin).then(() => {
//     console.log("Successfully imported documents.");
// }).catch(e => {
//     console.log("Failed to import documents: " + e);
// });



// Add a new document with a generated id.
// var addDoc = db.collection('cities').add({
//     name: 'Tokyo',
//     country: 'Japan'
// }).then(ref => {
//     console.log('Added document with ID: ', ref.id);
// });


const emails = chance.unique(chance.email, numUsers);

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randDate(){
    let newDate = new Date()
    const randomDateNum = Math.floor(Math.random() * 10);
    let day = newDate.getDate()-randomDateNum > 0 ? newDate.getDate()-randomDateNum : 1;
    const randomMonthNum = Math.floor(Math.random() * 3);
    let month = newDate.getMonth()-randomMonthNum > 0 ? newDate.getMonth()-randomMonthNum : 1;
    return month+" / "+day;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  const id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randTitle () {
  const numWords = chance.natural({
    min: 1,
    max: 3
  });
  return "what" + chance.sentence({words: numWords})
  .replace(/\b\w/g, function (m) {
    return  m.toUpperCase();
  })
  .slice(0, -1) + "?";
}

function randContent () {
    const numPars = chance.natural({
      min: 1,
      max: 2
    });
    return chance.n(chance.paragraph, numPars).join(' ')
}

//UrlPages.doc(url).collection(highlights).doc('highlightId',obj).collection(entries).auto
function randEntry (allUsers, highlightIds, url) {
  const user = chance.pick(allUsers);
  const highlight = chance.pick(highlightIds);
  const randomEntryType = Math.floor(Math.random() * 2);
  const isQuestion = [true, false][randomEntryType];
  const randomNumComments = Math.floor(Math.random() * 4);
  return seed.collection(`UrlPages/${url}/highlights/${highlight}/entries`, seed.doc("auto_id",{
    isQuestion,
    userName: user.userName,
    content: randContent(),
    date: randDate(),
    upVote: Math.floor(Math.random() * 100),
    downVotes: Math.floor(Math.random() * 100)
  }));
}

//sed.doc('auto_id',obj)
// function randComments (entry, allUsers){
//   const user = chance.pick(allUsers);
//   const comment = doTimes(numUsers, randUser)
//   return {
//     userName: user.userName,
//     entryId: entry.id,
//     content: randContent(),
//     date: randDate(),
//     upVote: Math.floor(Math.random() * 100),
//     downVotes: Math.floor(Math.random() * 100)
//   };
// }

//seed.doc(`${userName}`,obj)
function randUser () {
  let randomUserNum = Math.floor(Math.random() * 90);
  const gender = chance.gender();
  let firstName = chance.first({gender: gender});
  let lastName =  chance.last();
  let userName = lastName + "_" + randomUserNum;
  return {
    firstName,
    lastName,
    avatar: randPhoto(gender),
    email: emails.pop(),
    userName,
  };
}

function generateUsers() {
  const users = doTimes(numUsers, randUser);
  return users;
}

function generateEntries (users,urlHighlights, url) {
  return doTimes(numEntries, () => randEntry(users,urlHighlights, url));
}

function generateComments(allEntries, allUsers){
  const comments = doTimes(numComments, () => randComments(allEntries, allUsers));
  return comments;
}

// async function fetchHighlightsByUrl(urls){
//   let hlArr = [];
//   urls.forEach( async url => {
//     await urlPages.doc(url).collection('Highlights').get()
//       .then(querySnapshot => {
//         querySnapshot.forEach(async highlight => {
//           await hlArr.push(highlight.data());
//         });
//       })
//       .catch(error => console.log('error: ', error));
//   })
//   return hlArr;
// }


seedfile = () => {
  const allUsers = generateUsers()
  const AppleHighlights = highlightIds.Apple;
  const AppleEntries = generateEntries(allUsers, AppleHighlights, encodedUrls[0])
  const BannaHighlights = highlightIds.Banana;
  const BannaEntries = generateEntries(allUsers, BannaHighlights, encodedUrls[1])
  const CatHighlights = highlightIds.Cat;
  const CatEntries = generateEntries(allUsers, CatHighlights, encodedUrls[2])
  const allEntries = [...AppleEntries,...BannaEntries,...CatEntries]
  console.log("allEntries", allEntries)
  // console.log("allUsers", allUsers)
  // const comments = generateComments(allEntries, allUsers)
  // console.log("all comments", comments)

  const addUsers = allUsers.map((user) => seed.doc(user.userName,user))
  let userCollection = seed.collection("Users", addUsers);
  console.log(userCollection)

  userCollection.importDocuments(admin).then(() => {
    console.log("Successfully imported documents.");
}).catch(e => {
    console.log("Failed to import documents: " + e);
});

  allEntries.forEach(entry => entry.importDocuments(admin).then(() => {
    console.log("Successfully imported documents.");
}).catch(e => {
    console.log("Failed to import documents: " + e);
}));



}

seedfile();



// function randHighlight (allUrlPages) {
//     const url = chance.pick(allUrlPages);
//     return seed.doc("auto_id",{
//         userName: user.userName,
//         urlPage: url.id,
//         domPath: randContent(),
//         date: randDate(),
//         upVote: Math.floor(Math.random() * 100),
//         downVotes: Math.floor(Math.random() * 100)
//       })
// }