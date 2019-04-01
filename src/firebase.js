import firebase from "firebase";

var config = {
  apiKey: "AIzaSyATq6yp36sRF0T1PunHdMVXLYU9Y_m-mQw",
  authDomain: "blackbird-4d2a1.firebaseapp.com",
  databaseURL: "https://blackbird-4d2a1.firebaseio.com",
  projectId: "blackbird-4d2a1",
  storageBucket: "blackbird-4d2a1.appspot.com",
  messagingSenderId: "818782685612"
};
firebase.initializeApp(config);

export default firebase;
