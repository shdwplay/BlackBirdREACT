import firebase from "./firebase.js";

export function login(email, pw, cb) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .catch(err => {
      console.log(err);
      cb();
    });
}
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
  console.log(aux);
  return aux;
}

export const listenCollocutorsList = (userName, callback) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(userName)
    .collection("collocutors")
    .onSnapshot(snapshot => {
      let collocutors = [];
      snapshot.docs.forEach(el => {
        let aux = el.data();
        aux.id = el.id;
        collocutors.push(aux);
      });
      callback(collocutors);
    });
};

export const getMessages = (userId, collocutorId) => {
  let db = firebase.firestore();
  let userRef = db.collection("users").doc(userId);
  userRef
    .collection("collocutors")
    .doc(collocutorId)
    .collection("messages")
    .onSnapshot(function(querySnapshot) {
      var messages = [];
      console.log(querySnapshot);
      querySnapshot.forEach(function(doc) {
        messages.push(doc.data().text);
      });
      console.log("Messaggi tra chiara e antonio: ", messages.join(", "));
    });
};

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

  userRef = firebase
    .firestore()
    .collection("users")
    .doc(collocutorId)
    .collection("collocutors")
    .doc(currentUserId);

  userRef.collection("messages").add(message);
  userRef.update({ lastMsg: message });
};

export const listenMessages = (collocutorId, currentUserId, cb) => {
  firebase
    .firestore()
    .collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(collocutorId)
    .collection("messages")
    .orderBy("date", "asc")
    .limit(100)
    .onSnapshot(snapshot => {
      var messages = [];
      snapshot.forEach(el => {
        messages.push(el.data());
      });
      cb(messages);
    });
};
