// Dark Mode Functionality
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

function loadDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Show/Hide Login and Register Forms
function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

// Register New User
function registerUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.username === username)) {
        alert('User already exists!');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    showLogin();
}

// Login User
function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert('Invalid credentials');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'home.html';
}

// Save Lift Data
function saveLiftData() {
    const liftType = document.getElementById('liftType').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weight = document.getElementById('weight').value;
    const feeling = document.getElementById('feeling').value;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const userData = JSON.parse(localStorage.getItem(currentUser.username)) || {
        bench: [],
        squat: [],
        deadlift: [],
        shoulderPress: []
    };

    userData[liftType].push({ sets, reps, weight, feeling });

    localStorage.setItem(currentUser.username, JSON.stringify(userData));
    alert('Lift data saved successfully!');
    loadLiftData();  // Reload lift data to show the latest entry
}

// Load Lift Data
function loadLiftData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userData = JSON.parse(localStorage.getItem(currentUser.username));

    if (userData) {
        let liftHTML = '';
        Object.keys(userData).forEach(lift => {
            liftHTML += `<h3>${lift}</h3><ul>`;
            userData[lift].forEach(entry => {
                liftHTML += `<li>Sets: ${entry.sets}, Reps: ${entry.reps}, Weight: ${entry.weight}kg, Feeling: ${entry.feeling}</li>`;
            });
            liftHTML += `</ul>`;
        });

        document.getElementById('liftData').innerHTML = liftHTML;
    }
}

// Logout User
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// On page load, check if user is logged in
if (window.location.href.includes('home.html')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('user-name').textContent = currentUser.username;
        loadLiftData();
    }
}

