// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/remote-config';

const firebaseConfig = {
    apiKey: "AIzaSyBENHyu4pOfRVRLpBFkpkKbL4uYeZ5kWOg",
    authDomain: "towerdefense-a08da.firebaseapp.com",
    projectId: "towerdefense-a08da",
    storageBucket: "towerdefense-a08da.firebasestorage.app",
    messagingSenderId: "595021592459",
    appId: "1:595021592459:web:19ef781a045fbdd771218e",
    measurementId: "G-61PL64XLGB"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const remoteConfig = firebaseApp.remoteConfig();
