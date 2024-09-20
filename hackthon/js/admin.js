import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { auth, database } from './firebaseConfig.js';

// Add Student Function
document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentCNIC = document.getElementById('studentCNIC').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const studentEmail = document.getElementById('studentEmail').value.trim();
    const studentPassword = document.getElementById('studentPassword').value.trim();

    try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, studentEmail, studentPassword);
        const user = userCredential.user;

        // Save student data in Realtime Database
        await set(ref(database, 'students/' + user.uid), {
            cnic: studentCNIC,
            name: studentName,
            email: studentEmail,
            userType: 'student'
        });

        document.getElementById('addStudentMessage').textContent = 'Student added successfully!';
    } catch (error) {
        document.getElementById('addStudentMessage').textContent = 'Error adding student: ' + error.message;
    }
});

// Upload Marks Function
document.getElementById('uploadMarksForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value.trim();
    const course = document.getElementById('course').value.trim();
    const marks = document.getElementById('marks').value.trim();
    const totalMarks = document.getElementById('totalMarks').value.trim();
    const grade = document.getElementById('grade').value.trim();

    try {
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
