// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Check for saved dark mode preference on page load
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Form Submission and Data Saving
const liftForm = document.getElementById('lift-form');
liftForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const benchWeight = document.getElementById('bench').value;
    const benchReps = document.getElementById('bench-reps').value;
    const squatWeight = document.getElementById('squat').value;
    const squatReps = document.getElementById('squat-reps').value;

    const progressData = {
        bench: { weight: benchWeight, reps: benchReps },
        squat: { weight: squatWeight, reps: squatReps },
    };

    // Save to local storage or you can integrate it with backend later
    localStorage.setItem('progressData', JSON.stringify(progressData));

    alert('Progress saved!');
});

// Retrieve saved progress data (if any)
window.onload = function () {
    const savedProgress = JSON.parse(localStorage.getItem('progressData'));
    if (savedProgress) {
        document.getElementById('bench').value = savedProgress.bench.weight;
        document.getElementById('bench-reps').value = savedProgress.bench.reps;
        document.getElementById('squat').value = savedProgress.squat.weight;
        document.getElementById('squat-reps').value = savedProgress.squat.reps;
    }
};
