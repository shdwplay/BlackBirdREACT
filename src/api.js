import firebase from "./firebase.js";

export const firebaseAuth = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) resolve(user.email.split("@")[0]);
      else reject("authentification failed");
    });
  });
};

export const getUserInfo = (userName, cb) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(userName)
    .get()
    .then(doc => cb(doc.data()));
};

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
  userRef.update({ lastMessage: message });
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
    .limit(5)
    .onSnapshot(snapshot => {
      var messages = [];
      snapshot.forEach(el => {
        messages.push(el.data());
      });
      cb(messages);
    });
};
