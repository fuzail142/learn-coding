// js/admin.js
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { auth, database } from './firebaseConfig.js';


// Initialize Realtime Database
const database = getDatabase();

// Add Student
document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cnic = document.getElementById('cnic').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Store user details in Firestore
    await setDoc(doc(db, 'users', userId), {
      firstName,
      lastName,
      email,
      cnic,
      userType: 'student'
    });

    // Store user details in Realtime Database
    await set(ref(database, 'students/' + userId), {
      firstName,
      lastName,
      email,
      cnic,
      userType: 'student'
    });

    document.getElementById('addStudentMessage').textContent = 'Student added successfully!';
  } catch (error) {
    document.getElementById('addStudentMessage').textContent = 'Error adding student: ' + error.message;
  }
});

// Upload Marks
document.getElementById('uploadMarksForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const course = document.getElementById('course').value;
  const studentId = document.getElementById('studentId').value;
  const marks = document.getElementById('marks').value;
  const totalMarks = document.getElementById('totalMarks').value;
  const grade = document.getElementById('grade').value;

  try {
    await addDoc(collection(db, 'marks'), {
      course,
      studentId,
      marks,
      totalMarks,
      grade
    });

    document.getElementById('uploadMarksMessage').textContent = 'Marks uploaded successfully!';
  } catch (error) {
    document.getElementById('uploadMarksMessage').textContent = 'Error uploading marks: ' + error.message;
  }
});
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://student-portal-5dfb9-default-rtdb.firebaseio.com"
});