const form = document.getElementById("workoutForm");
const tableBody = document.querySelector("#progressTable tbody");
const toggle = document.getElementById("darkModeToggle");

// Load from localStorage on start
window.onload = function () {
  loadTable();
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark-mode");
  }
};

// Toggle dark mode
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark", document.body.classList.contains("dark-mode"));
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const lift = document.getElementById("lift").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;
  const feeling = document.getElementById("feeling").value;
  const date = new Date().toLocaleDateString();

  const entry = { date, lift, sets, reps, weight, feeling };
  let data = JSON.parse(localStorage.getItem("workouts") || "[]");
  data.push(entry);
  localStorage.setItem("workouts", JSON.stringify(data));
  addToTable(entry);
  form.reset();
});

// Add entry to table
function addToTable(entry) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${entry.date}</td><td>${entry.lift}</td><td>${entry.sets}</td><td>${entry.reps}</td><td>${entry.weight}</td><td>${entry.feeling}</td>`;
  tableBody.appendChild(row);
}

// Load all entries
function loadTable() {
  let data = JSON.parse(localStorage.getItem("workouts") || "[]");
  data.forEach(addToTable);
}
