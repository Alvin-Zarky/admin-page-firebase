import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBPzyQUIy7XYt_DXFnXTCIVZPM67zH3RNA",
  authDomain: "admin-flutter-app.firebaseapp.com",
  projectId: "admin-flutter-app",
  storageBucket: "admin-flutter-app.appspot.com",
  messagingSenderId: "1059663778655",
  appId: "1:1059663778655:web:26ad52941813aaeec25cea"
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const auth = firebase.auth()
const storage= firebase.storage()
const database= firebase.database()
const timestamp= firebase.firestore.FieldValue.serverTimestamp()

export {
  firestore,
  auth,
  storage,
  database,
  timestamp
}