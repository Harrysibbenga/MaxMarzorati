import firebase from "firebase/app";
import 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";

// firebase init goes here
const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

// firebase utils
const db = firebase.firestore(),
    auth = firebase.auth(),
    storage = firebase.storage(),
    postsCollection = db.collection("posts"),
    imageCollection = db.collection('images'),
    circuitsCollection = db.collection('circuits'),
    calendarCollection = db.collection("calendar"),
    profileCollection = db.collection('profile'),
    videoCollection = db.collection('video'),
    fanclubPage = db.collection('fanclubPage'),
    marketingPage = db.collection('marketingPage'),
    partnersPage = db.collection('partnersPage'),
    videoSection = db.collection('videoSection'),
    mediaCollection = db.collection('media');


// firebase collections

export {
    db,
    auth,
    storage,
    postsCollection,
    imageCollection,
    circuitsCollection,
    calendarCollection,
    profileCollection,
    videoCollection,
    fanclubPage,
    marketingPage,
    videoSection,
    mediaCollection,
    partnersPage
};