function toggleForms(form) {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    if (form === 'signup') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else if (form === 'login') {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

document.querySelector('.search-bar').addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const simulatorCards = document.querySelectorAll('.simulator-card');
    
    simulatorCards.forEach(card => {
        const title = card.querySelector('p').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

document.querySelector('.change-button').addEventListener('click', function () {
    alert('Profile changes saved!');
});

document.querySelector('.cancel-button').addEventListener('click', function () {
    if (confirm('Are you sure you want to cancel changes?')) {
        document.querySelectorAll('.profile-form input').forEach(input => input.value = '');
    }
});

document.querySelector('.logout').addEventListener('click', function () {
    if (confirm('Are you sure you want to log out?')) {
        alert('Logged out successfully!');
    }
});

document.querySelectorAll('.simulator-details button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Simulator dibuka!');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.style.display = "block";
    }
});
