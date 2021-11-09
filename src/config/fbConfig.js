import firebase from "firebase/app";
import 'firebase/firestore'; //database
import 'firebase/auth';//authentication

const config = {
  apiKey: "AIzaSyAdTGxkq96UifzbPHx90AEDozHt9BxYQAI",
  authDomain: "net-ninja-marioplan-53eec.firebaseapp.com",
  projectId: "net-ninja-marioplan-53eec",
  storageBucket: "net-ninja-marioplan-53eec.appspot.com",
  messagingSenderId: "716623356966",
  appId: "1:716623356966:web:0fae125c2a25a6e38d72e7",
  measurementId: "G-HZZS49WP79",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});
export const firestore = firebaseApp.firestore();
export default firebase;
 