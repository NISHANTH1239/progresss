function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    alert("Registered! Now login.");
  } else {
    alert("Please enter both username and password.");
  }
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (
    user === localStorage.getItem("user") &&
    pass === localStorage.getItem("pass")
  ) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
    switchTab("log");
    loadProgress();
  } else {
    alert("Invalid login. Try again or register.");
  }
}

function switchTab(id) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function saveLift() {
  const lift = document.getElementById("liftType").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;
  const feel = document.getElementById("feel").value;
  const date = new Date().toLocaleDateString();

  const entry = { lift, sets, reps, weight, feel, date };

  let data = JSON.parse(localStorage.getItem("progress")) || [];
  data.push(entry);
  localStorage.setItem("progress", JSON.stringify(data));

  alert("Lift Saved!");
  loadProgress();
}

function loadProgress() {
  const table = document.getElementById("progressTable");
  const data = JSON.parse(localStorage.getItem("progress")) || [];

  table.innerHTML = `<tr>
    <th>Lift</th><th>Sets</th><th>Reps</th><th>Weight</th><th>Feel</th><th>Date</th>
  </tr>`;

  data.forEach((entry) => {
    const row = table.insertRow(-1);
    row.innerHTML = `
      <td>${entry.lift}</td>
      <td>${entry.sets}</td>
      <td>${entry.reps}</td>
      <td>${entry.weight}</td>
      <td>${entry.feel}</td>
      <td>${entry.date}</td>`;
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
