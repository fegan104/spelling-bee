import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_kK3KrW0rxcfFowsfj2aRlXWMX46XlFU",
  authDomain: "spelling-bee-365b3.firebaseapp.com",
  projectId: "spelling-bee-365b3",
  storageBucket: "spelling-bee-365b3.appspot.com",
  messagingSenderId: "609204302314",
  appId: "1:609204302314:web:cf7e5548ae19bab0818293",
  measurementId: "G-YTVQKS7DKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const sendToFirebaseAnalytics = ({ id, name, value }) => {
  logEvent(analytics, name, {
    category: 'Web Vitals',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
  });
}

export const sendGameStartEvent = () => {
  logEvent(analytics, "game_start");
}

export const sendDictionaryDownloadFailedEvent = (errorMsg) => {
  logEvent(analytics, "dictionary_download_failed", {
    error: errorMsg
  });
}