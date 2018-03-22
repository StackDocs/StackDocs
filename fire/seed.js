const admin = require("firebase-admin");
seed = require('./frans-firestore-seed');

 
// Initialize firebase-admin.
admin.initializeApp({
    "apiKey": "AIzaSyAKaRAd1hVazZ242hd9_u3TPEBDN8AzamQ",
    "databaseURL": "https://chromelights-bb54c.firebaseio.com",
    "storageBucket": "chromelights-bb54c.appspot.com",
    "authDomain": "chromelights-bb54c.firebaseapp.com",
    "messagingSenderId": "851772945859",
    "projectId": "chromelights-bb54c"
});
  
  
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

//Used this seed file for convenience. Not meant for extra credit submission.  


const toonAvatar = require('cartoon-avatar');

// In order of association 
const numUrlPages = 5;  // urlPages has many highlights
const numHighlightsPerUser = 5 // highlight has many annotations and has many questions
const numEntriesPerUser = 10; // annotation has many comments and questions has many comments
const numCommentsPerUser = 20; // coments has one user, and annotation or question id

const numUsers = 30; // users has many annotation and has many questions

const manualUrlPages = [
    "en.wikipedia.org/wiki/Apple",
    "en.wikipedia.org/wiki/Banana",
    "en.wikipedia.org/wiki/Cat",
    "en.wikipedia.org/wiki/Dog",
    "en.wikipedia.org/wiki/Zebra"
]

const addUrlPage = manualUrlPages.map((url, i) => seed.doc(url,{ hightlights: []}))


let urlPageCollection = seed.collection("urlPages", addUrlPage);


// urlPageCollection.importDocuments(admin).then(() => {
//     console.log("Successfully imported documents.");
// }).catch(e => {
//     console.log("Failed to import documents: " + e);
// });


// const emails = chance.unique(chance.email, numUsers);

// Add a new document with a generated id.
var addDoc = db.collection('cities').add({
    name: 'Tokyo',
    country: 'Japan'
}).then(ref => {
    console.log('Added document with ID: ', ref.id);
});



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

function randHighlight (allUrlPages) {
    const url = chance.pick(allUrlPages);
    return seed.doc("auto_id",{
        userName: user.userName,
        urlPage: url.id,
        domPath: randContent(),
        date: randDate(),
        upVote: Math.floor(Math.random() * 100),
        downVotes: Math.floor(Math.random() * 100)
      })
}

function randComments (entry){
    return seed.doc("auto_id",{
        userName: entry.userName,
        entryId: entry.id,
        content: randContent(),
        date: randDate(),
        upVote: Math.floor(Math.random() * 100),
        downVotes: Math.floor(Math.random() * 100)
    })
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
      max: 3
    });
    return chance.n(chance.paragraph, numPars).join(' ')
}

function randEntry (allUsers, highlight) {
    const user = chance.pick(allUsers);
    const highlight = chance.pick(highlight);
    const randomEntryNum = Math.floor(Math.random() * 100);
    const entryType = ["question", "annotation"][randomEntryNum];
    let firstName = chance.first({gender: gender});
    let lastName =  chance.last();
    let userName = this.lastName+randomUserNum;
    return seed.doc(`Entries/${entryType}`,{
      userName: user.userName,
      highlightId: highlight.id,
      content: randContent(),
      date: randDate(),
      upVote: Math.floor(Math.random() * 100),
      downVotes: Math.floor(Math.random() * 100)
    });
  }

function randUser () {
  let randomUserNum = Math.floor(Math.random() * 90);
  const gender = chance.gender();
  let firstName = chance.first({gender: gender});
  let lastName =  chance.last();
  let userName = this.lastName+randomUserNum;
  return seed.doc(`${userName}`,{
    firstName,
    lastName,
    avatar: randPhoto(gender),
    email: emails.pop(),
    displayName: this.firstName+" "+ this.lastName,
  });
}


function generateUsers() {
  const users = doTimes(numUsers, randUser);
  return users;
}

function generateEntry (createdEntry) {
  return doTimes(numEntry, () => randComments(creat));
}

function generateEntries (createdEntres) {
    return doTimes(numStudents, () => randStudent(createdCampuses));
  }


function createCampus () {
  return Promise.map(generateCampus(), user => user.save());
}

function createStudents (createdCampus) {
  return Promise.map(generateStudents(createdCampus), story => story.save());
}

function seed () {
  return createCampus()
  .then(createdCampuses => createStudents(createdCampuses));
}