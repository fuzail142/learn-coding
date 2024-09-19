// firebaseConfig.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBnl-Q-kWR2USc37eL_8Dcgppdvg3xHhUw",
    authDomain: "student-portal-5dfb9.firebaseapp.com",
    databaseURL: "https://student-portal-5dfb9-default-rtdb.firebaseio.com",
    projectId: "student-portal-5dfb9",
    storageBucket: "student-portal-5dfb9.appspot.com",
    messagingSenderId: "893061299529",
    appId: "1:893061299529:web:d292e825591823b2d7ae98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
