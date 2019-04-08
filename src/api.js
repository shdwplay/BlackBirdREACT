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

export function setAuthObserver(cb1, cb2) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("loggged", user);
      cb1(user);
    } else {
      console.log("not logged:", user);
      cb2();
    }
  });
}
export async function getUserDetails(userName) {
  const userDoc = await db
    .collection("users")
    .doc(userName)
    .get();
  return { ...userDoc.data(), userName: userName };
}

export const listenCollocutorsList = (userName, callback) => {
  return db
    .collection("users")
    .doc(userName)
    .collection("collocutors")
    .where("listed", "==", true)
    .onSnapshot(snapshot => {
      let collocutors = [];
      snapshot.docs.forEach(el => {
        collocutors.push({
          ...el.data(),
          id: el.id
        });
      });
      callback(collocutors);
    });
};

export const addMessage = (collocutorId, currentUserId, text) => {
  let message = {
    text: text,
    sender: currentUserId,
    date: new Date(),
    unread: true
  };
  let userRef = db
    .collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(collocutorId);

  userRef.collection("messages").add(message);
  userRef.update({ lastMsg: message });

  let collocutorsRef = db
    .collection("users")
    .doc(collocutorId)
    .collection("collocutors")
    .doc(currentUserId);

  collocutorsRef.collection("messages").add(message);
  collocutorsRef.update({ lastMsg: message });
};

export const listenMessages = (collocutorId, currentUserId, cb) => {
  db.collection("users")
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

export const setFavouriteCard = (currentUserId, cardId, value) => {
  db.collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(cardId)
    .update({ favourite: !value });
};
export const setSilenceCard = (currentUserId, cardId, value) => {
  db.collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(cardId)
    .update({ silenced: !value });
};
export const setUnlistedCard = (currentUserId, cardId, value) => {
  db.collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(cardId)
    .update({ listed: !value });
};

export const toggleAFK = currentUserId => {
  db.collection("users")
    .doc(currentUserId)
    .get()
    .then(doc => {
      db.collection("users")
        .doc(currentUserId)
        .update({
          userStatus: doc.data().userStatus === "away" ? "online" : "away"
        });
    });
};

export const listenProfile = (currentUserId, cb) => {
  db.collection("users")
    .doc(currentUserId)
    .onSnapshot(snapshot => {
      let userStatus = snapshot.data().userStatus;
      cb(userStatus);
    });
};