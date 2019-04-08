import firebase from "./firebase.js";

const db = firebase.firestore();

export function login(email, pw, cb) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .catch(err => {
      console.log(err);
      cb();
    });
}
//add two callbacks
export function setAuthObserver(showLogin, getUserData) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("loggged", user);
      getUserData(user);
    } else {
      console.log("not logged:", user);
      showLogin();
    }
  });
}
export async function getUserDetails(userName) {
  const userDoc = await firebase
    .firestore()
    .collection("users")
    .doc(userName)
    .get();
  let aux = userDoc.data();
  aux.userName = userName;
  return aux;
} //use spread

export const listenCollocutorsList = (userName, callback) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(userName)
    .collection("collocutors")
    .onSnapshot(snapshot => {
      let collocutors = [];
      snapshot.docs.forEach(el => {
        // let aux = el.data();
        // aux.id = el.id;
        collocutors.push({
          ...el.data(),
          id: el.id
        });
      });
      callback(collocutors);
    });
};

// export const getMessages = (userName, collocutorId) => {
//   let db = firebase.firestore();
//   let userRef = db.collection("users").doc(userName);
//   userRef
//     .collection("collocutors")
//     .doc(collocutorId)
//     .collection("messages")
//     .onSnapshot(function(querySnapshot) {
//       var messages = [];
//       querySnapshot.forEach(function(doc) {
//         messages.push(doc.data().text);
//       });
//       console.log("Messaggi tra chiara e antonio: ", messages.join(", "));
//     });
// };

export const addMessage = (collocutorId, currentUserId, text) => {
  let message = {
    text: text,
    sender: currentUserId,
    date: new Date(),
    unread: true
  };
  let userRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(collocutorId);

  userRef.collection("messages").add(message);
  userRef.update({ lastMsg: message });

  let collocutorsRef = firebase
    .firestore()
    .collection("users")
    .doc(collocutorId)
    .collection("collocutors")
    .doc(currentUserId);

  collocutorsRef.collection("messages").add(message);
  collocutorsRef.update({ lastMsg: message });
};

export const listenMessages = (collocutorId, currentUserId, cb) => {
  firebase
    .firestore()
    .collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(collocutorId)
    .collection("messages")
    .orderBy("date", "desc")
    .limit(100)
    .onSnapshot(snapshot => {
      var messages = [];
      snapshot.forEach(el => {
        messages.push(el.data()); //give id
      });
      cb(messages);
    });
};
