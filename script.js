// Toggle dark mode
document.getElementById("darkToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
});

// Save lift data
function saveLift() {
  const lift = document.getElementById("liftType").value;
  const weight = document.getElementById("weight").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const feeling = document.getElementById("feeling").value;
  const date = new Date().toLocaleDateString();

  const entry = { date, lift, weight, sets, reps, feeling };
  let allData = JSON.parse(localStorage.getItem("liftData") || "[]");
  allData.push(entry);
  localStorage.setItem("liftData", JSON.stringify(allData));
  showData();
}

// Show data in table
function showData() {
  const data = JSON.parse(localStorage.getItem("liftData") || "[]");
  const table = document.getElementById("liftTable");
  table.innerHTML = `<tr><th>Date</th><th>Lift</th><th>Weight</th><th>Sets</th><th>Reps</th><th>Feeling</th></tr>`;
  data.forEach(d => {
    table.innerHTML += `<tr><td>${d.date}</td><td>${d.lift}</td><td>${d.weight}</td><td>${d.sets}</td><td>${d.reps}</td><td>${d.feeling}</td></tr>`;
  });
}

// Render chart
function renderChart() {
  const data = JSON.parse(localStorage.getItem("liftData") || "[]");
  const labels = data.map(d => d.date);
  const weights = data.map(d => parseInt(d.weight));
  new Chart(document.getElementById("progressChart"), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Weight Lifted (kg)',
        data: weights,
        borderColor: 'orange',
        fill: false,
        tension: 0.1
      }]
    },
    options: { responsive: true }
  });
}

if (location.pathname.includes("dashboard")) {
  showData();
  renderChart();
}

// Login system
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[u] && users[u] === p) {
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong credentials or user not registered.");
  }
}

function toggleRegister() {
  const u = prompt("Enter username to register");
  const p = prompt("Enter password");
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  users[u] = p;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered! Now you can log in.");
}
