// student.js
import { auth, database } from './firebaseConfig.js';
import { onValue } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';


document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cnicEdit = document.getElementById('cnicEdit').value;

    // Update the CNIC in the database
    const userId = auth.currentUser.uid;
    await set(ref(database, 'students/' + userId + '/cnic'), cnicEdit);
    document.getElementById('editProfileMessage').textContent = 'Profile updated successfully!';
});

document.getElementById('checkResultForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const checkCNIC = document.getElementById('checkCNIC').value;

    const resultRef = ref(database, 'marks/' + checkCNIC);
    onValue(resultRef, (snapshot) => {
        const resultData = snapshot.val();
        if (resultData) {
            document.getElementById('resultMessage').textContent = `Course: ${resultData.course}, Marks: ${resultData.marks}, Total Marks: ${resultData.totalMarks}, Grade: ${resultData.grade}`;
        } else {
            document.getElementById('resultMessage').textContent = 'No results found.';
        }
    });
});
