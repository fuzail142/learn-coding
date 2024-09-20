import { auth } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Check if user is authenticated
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }
});

document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Store user details in Realtime Database
        await set(ref(database, 'students/' + userId), {
            firstName,
            lastName,
            email,
            userType
        });

        document.getElementById('addUserMessage').textContent = 'User added successfully!';
    } catch (error) {
        document.getElementById('addUserMessage').textContent = 'Error adding user: ' + error.message;
    }
});
import { auth, database } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Function to add user
document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get values from form
    // Your existing user addition logic here...
});

// Function to upload marks
document.getElementById('uploadMarksForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value; // CNIC
    const course = document.getElementById('course').value;
    const marks = document.getElementById('marks').value;
    const totalMarks = document.getElementById('totalMarks').value;
    const grade = document.getElementById('grade').value;

    try {
        // Ensure the user is authenticated and has the proper role
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User not authenticated.');
        }

        // Store marks in Realtime Database
        await set(ref(database, 'marks/' + studentId + '/' + course), {
            marks,
            totalMarks,
            grade
        });

        document.getElementById('uploadMarksMessage').textContent = 'Marks uploaded successfully!';
    } catch (error) {
        document.getElementById('uploadMarksMessage').textContent = 'Error uploading marks: ' + error.message;
    }
});

// Function to get all students
// Your existing logic to display students...
