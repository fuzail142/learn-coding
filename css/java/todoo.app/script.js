// Check if email is stored in local storage
function checkUserLogin() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        hideLoginForm();
        showHomePage();
    }
}

// Add task to local storage
function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    if (taskInput) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(taskInput);
        saveTasksToLocalStorage(tasks);
        displayTasks();
    }
}

// Display tasks from local storage
function displayTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Logout and clear email from local storage
function logout() {
    localStorage.removeItem('userEmail');
    location.reload(); // Refresh the page
}

// Utility functions

function hideLoginForm() {
    document.getElementById('loginForm').style.display = 'none';
}

function showHomePage() {
    document.getElementById('homePage').style.display = 'block';
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Call checkUserLogin on page load
window.onload = checkUserLogin;
// Save email to local storage
localStorage.setItem('userEmail', 'fuzailkhalil142@gmail.com');

// Retrieve email from local storage
const userEmail = localStorage.getItem('userEmail');
