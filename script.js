let currentUser = null;

function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (!user || !pass) return showMessage("Fill all fields");
  if (localStorage.getItem(`user_${user}`)) {
    return showMessage("User already exists");
  }
  localStorage.setItem(`user_${user}`, pass);
  showMessage("Registered! Please login.");
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const stored = localStorage.getItem(`user_${user}`);
  if (stored && stored === pass) {
    currentUser = user;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadEntries();
  } else {
    showMessage("Invalid login");
  }
}

function logout() {
  currentUser = null;
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("app").style.display = "none";
}

function showMessage(msg) {
  document.getElementById("auth-msg").innerText = msg;
}

function saveEntry() {
  const liftType = document.getElementById("liftType").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;
  const feel = document.getElementById("feel").value;

  const entry = {
    liftType,
    sets: parseInt(sets),
    reps: parseInt(reps),
    weight: parseFloat(weight),
    feel,
    date: new Date().toLocaleDateString()
  };

  const key = `entries_${currentUser}`;
  let entries = JSON.parse(localStorage.getItem(key)) || [];
  entries.push(entry);
  localStorage.setItem(key, JSON.stringify(entries));
  loadEntries();
}

function loadEntries() {
  const key = `entries_${currentUser}`;
  const entries = JSON.parse(localStorage.getItem(key)) || [];
  const container = document.getElementById("entries");
  container.innerHTML = "";

  let chartData = {};

  entries.forEach(entry => {
    const div = document.createElement("div");
    div.innerText = `${entry.date} - ${entry.liftType}: ${entry.sets} sets × ${entry.reps} reps @ ${entry.weight}kg (${entry.feel})`;
    container.appendChild(div);

    if (!chartData[entry.liftType]) {
      chartData[entry.liftType] = { dates: [], weights: [] };
    }
    chartData[entry.liftType].dates.push(entry.date);
    chartData[entry.liftType].weights.push(entry.weight);
  });

  drawChart(chartData);
}

function drawChart(data) {
  const ctx = document.getElementById("chart").getContext("2d");
  if (window.chart) window.chart.destroy();

  const datasets = Object.keys(data).map((lift, i) => ({
    label: lift,
    data: data[lift].weights,
    borderColor: ["red", "green", "blue", "orange"][i],
    tension: 0.3
  }));

  window.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data[Object.keys(data)[0]]?.dates || [],
      datasets: datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Weight (kg)" }
        }
      }
    }
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
