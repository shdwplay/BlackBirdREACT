import firebase from "./firebase.js";

export const firebaseAuth = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) resolve(user.email.split("@")[0]);
      else reject("authentification failed");
    });
  });
};

export const getUserInfo = userName => {
  return firebase
    .firestore()
    .collection("users")
    .doc(userName)
    .get()
    .then(doc => doc.data());
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
