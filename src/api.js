import firebase from "./firebase.js";

const db = firebase.firestore();

//mettere catch altra parte
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
        let collocutorid = el.data().id;
        db.collection("users")
          .doc(userName)
          .collection("collocutors")
          .doc(collocutorid)
          .collection("messages")
          .where("read", "==", false)
          .get()
          .then(x => {
            collocutors.push({
              ...el.data(),
              numUnread: x.docs.length,
              id: el.id
            });
          })
          .then(() => callback(collocutors));
      });
    });
};

export const addMessage = (collocutorId, currentUserId, text) => {
  let message = {
    text: text,
    sender: currentUserId,
    date: new Date(),
    read: false
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
  return db
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
        messages.push({ ...el.data(), id: el.id });
      });
      cb(messages);
    });
};

export const getContacts = (userName, cb) => {
  db.collection("users")
    .get()
    .then(function(querySnapshot) {
      var contacts = []
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            if (doc.id !== userName) {
              contacts.push({
                ...doc.data(),
                id: doc.id
              })
            }
            
        });
        cb(contacts)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

export const addCollocutorToDb = (currentUserId, collocutorId, collocutorName, message, sender) => {
  db.collection("users")
    .doc(currentUserId)
    .collection("collocutors")
    .doc(collocutorId)
    .set({
      name: collocutorName,
      id: collocutorId,
      favourite: false,
      silenced: false,
      listed: true,
      lastMsg: {
        text: message,
        date: new Date(),
        read: false,
        sender: sender
      }
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}
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
export const setReadMessages = (collocutorId, currentUserId, newMessageIds) => {
  newMessageIds.forEach(el => {
    db.collection("users")
      .doc(currentUserId)
      .collection("collocutors")
      .doc(collocutorId)
      .collection("messages")
      .doc(el)
      .update({ read: true });
  });
};
