import { initializeApp } from "firebase/app";

const FirebaseConfig = {
  apiKey: "AIzaSyDfBVlsNlqDzU5H35B1ySGRRTaCuPbbupo",
  authDomain: "react-app-e0da0.firebaseapp.com",
  databaseURL: "https://react-app-e0da0-default-rtdb.firebaseio.com",
  projectId: "react-app-e0da0",
  storageBucket: "react-app-e0da0.appspot.com",
  messagingSenderId: "653342828068",
  appId: "1:653342828068:web:e541047cc815121d6b9ab1",
  measurementId: "G-2SBE37SJ96"
};
const firebaseApp = initializeApp(FirebaseConfig);

export default firebaseApp;