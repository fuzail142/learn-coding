// login.js
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { auth, database } from './firebaseConfig.js';


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Redirect based on user type
        const userRef = ref(database, 'students/' + user.uid);
        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData.userType === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'student.html';
            }
        });
    } catch (error) {
        document.getElementById('loginMessage').textContent = 'Error: ' + error.message;
    }
});
