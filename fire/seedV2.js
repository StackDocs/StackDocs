const admin = require("firebase-admin");
seed = require('./frans-firestore-seed');
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
// let messagesCollection = seed.collection("messages", [
//     seed.doc("threesCompany", {
//         content: "Hello firestore-seed.",
//         created: new Date(),
//     }),
//     seed.doc("happyDays", {
//         content: "Good bye firestore-seed.",
//         created: new Date(),
//     })
// ]);

// console.log(messagesCollection)

// messagesCollection.importDocuments(admin).then(() => {
//     console.log("Successfully imported documents.");
// }).catch(e => {
//     console.log("Failed to import documents: " + e);
// });


// const obj = {
//     comments : [{},{},{}],
//     content : "Unlike Tommy I actually know how hooks work. Its a hook the happens before something is destroyed :D",
//     date: new.Date(),
//     downVote : 2,
//     highlight: "beforeDestroy Hooks",
//     title: "What is this?",
//     upVote: 99,
//     user: "Glen Adams"
// }



// In order of association 
// const numUrlPages = 5;  // urlPages has many highlights
// const numHighlights = 5;  // highlight has many annotations and has many questions
const numEntries = 50; // annotation has many comments and questions has many comments
const numComments = 100; // coments has one user, and annotation or question id

const numUsers = 30; // users has many annotation and has many questions

const manualUrlPages = [
    "en.wikipedia.org/wiki/Apple",
    "en.wikipedia.org/wiki/Banana",
    "en.wikipedia.org/wiki/Cat",
    "en.wikipedia.org/wiki/Dog",
    "en.wikipedia.org/wiki/Zebra"
]

// const addUrlPage = manualUrlPages.map((url, i) => seed.doc(url,{ hightlights: []}))


// let urlPageCollection = seed.collection("urlPages", addUrlPage);


// urlPageCollection.importDocuments(admin).then(() => {
//     console.log("Successfully imported documents.");
// }).catch(e => {
//     console.log("Failed to import documents: " + e);
// });


const emails = chance.unique(chance.email, numUsers);

// Add a new document with a generated id.
// var addDoc = db.collection('cities').add({
//     name: 'Tokyo',
//     country: 'Japan'
// }).then(ref => {
//     console.log('Added document with ID: ', ref.id);
// });



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
      max: 3
    });
    return chance.n(chance.paragraph, numPars).join(' ')
}

//sed.doc('auto_id',obj)
function randEntry (allUsers, urlHighlights) {
  const user = chance.pick(allUsers);
  const highlight = chance.pick(urlHighlights);
  const randomEntryNum = Math.floor(Math.random() * 2);
  const entryType = ["question", "annotation"][randomEntryNum];
  let firstName = chance.first({gender: gender});
  let lastName =  chance.last();
  let userName = this.lastName+randomUserNum;
  return {
    userName: user.userName,
    highlightId: highlight.id,
    content: randContent(),
    date: randDate(),
    upVote: Math.floor(Math.random() * 100),
    downVotes: Math.floor(Math.random() * 100)
  };
}

//sed.doc('auto_id',obj)
function randComments (allEntries){
  const entry = chance.pick(allEntries);
  return {
      userName: entry.userName,
      entryId: entry.id,
      content: randContent(),
      date: randDate(),
      upVote: Math.floor(Math.random() * 100),
      downVotes: Math.floor(Math.random() * 100)
  }
}

//seed.doc(`${userName}`,obj)
function randUser () {
  let randomUserNum = Math.floor(Math.random() * 90);
  const gender = chance.gender();
  let firstName = chance.first({gender: gender});
  let lastName =  chance.last();
  let userName = this.lastName+randomUserNum;
  return {
    firstName,
    lastName,
    avatar: randPhoto(gender),
    email: emails.pop(),
    displayName: this.firstName+" "+ this.lastName,
  };
}

function generateUsers() {
  const users = doTimes(numUsers, randUser);
  return users;
}

function generateEntries (users,urlHighlights) {
  return doTimes(numEntries, () => randEntry(users,urlHighlights));
}

function generateComments(allEntries){
  const comments = doTimes(numComments, () => randComments(allEntries));
  return users;
}

function fetchHighlightsByUrl(url){
  const hlArr = [];
  urlPages.doc(url).collection('Highlights').get()
    .then(querySnapshot => {
      querySnapshot.forEach(highlight => {
        hlArr.push(highlight.data());
      });
    })
    .catch(error => console.log('error: ', error));
    return hlArr;
}

let allHighlights = [];



seed = () => {
  const allUsers = generateUsers()
  let allHighlights = [];
  manualUrlPages.forEach(url => {
    let hlArr = fetchHighlightsByUrl(url)
    allHighlights = [...allHighlights,...hlArr]
  })
  // const entries = generateEntries(allUsers, allHighlights)
  // console.log("allEntries", entries)
  console.log("allHighlights", allHighlights)
  console.log("allUsers", allUsers)

}

seed();