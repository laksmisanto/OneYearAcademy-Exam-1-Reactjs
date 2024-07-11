import { initializeApp } from "firebase/app";
export const firebaseConfig = {
  apiKey: "AIzaSyC1Ep9jW1qoLlo7eeZt7ItMKoTTnoN5d_0",
  authDomain: "oneyear-exam.firebaseapp.com",
  databaseURL: "https://oneyear-exam-default-rtdb.firebaseio.com",
  projectId: "oneyear-exam",
  storageBucket: "oneyear-exam.appspot.com",
  messagingSenderId: "214150094964",
  appId: "1:214150094964:web:a117dd989932650faf7121",
  measurementId: "G-YXBCXY5DBS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
