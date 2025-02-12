const users = [
    { username: "user1", password: "password123" },
    { username: "user2", password: "password456" }
];

let loggedInUser = null;
let portfolios = [];

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const dashboard = document.getElementById('dashboard');
const portfolioForm = document.getElementById('portfolio-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const createPortfolioButton = document.getElementById('create-portfolio');
const portfolioList = document.getElementById('portfolio-list');
const userNameDisplay = document.getElementById('user-name');
const portfolioFormElement = document.getElementById('create-portfolio-form');

document.getElementById('login').addEventListener('submit', handleLogin);
document.getElementById('register').addEventListener('submit', handleRegister);
createPortfolioButton.addEventListener('click', showPortfolioForm);
portfolioFormElement.addEventListener('submit', handlePortfolioSubmit);

document.getElementById('show-register').addEventListener('click', showRegisterForm);

document.getElementById('show-login').addEventListener('click', showLoginForm);

document.getElementById('logout').addEventListener('click', handleLogout);

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        loggedInUser = user;
        loginForm.classList.add('hidden');
        dashboard.classList.remove('hidden');
        userNameDisplay.textContent = loggedInUser.username;
        renderPortfolios();
    } else {
        
        loginError.textContent = 'Invalid username or password';
    }
}

function handleRegister(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        registerError.textContent = 'Passwords do not match';
        return;
    }

    if (users.find(user => user.username === newUsername)) {
        registerError.textContent = 'Username already exists';
        return;
    }

    users.push({ username: newUsername, password: newPassword });
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    registerError.textContent = '';
}

function showRegisterForm() {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
}

function showLoginForm() {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

function showPortfolioForm() {
    portfolioForm.classList.remove('hidden');
}

function handlePortfolioSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('portfolio-name').value;
    const bio = document.getElementById('bio').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const projects = document.getElementById('projects').value.split(',').map(project => project.trim());

    const portfolio = {
        name,
        bio,
        skills,
        projects
    };
    portfolios.push(portfolio);
    portfolioForm.classList.add('hidden');
    renderPortfolios();
}

function renderPortfolios() {
    portfolioList.innerHTML = ''; 

    portfolios.forEach((portfolio, index) => {
        const card = document.createElement('div');
        card.classList.add('portfolio-card');
        card.innerHTML = `
            <h3>${portfolio.name}</h3>
            <p><strong>Bio:</strong> ${portfolio.bio}</p>
            <p><strong>Skills:</strong> ${portfolio.skills.join(', ')}</p>
            <p><strong>Projects:</strong> ${portfolio.projects.join(', ')}</p>
            <button onclick="deletePortfolio(${index})">Delete</button>
        `;
        portfolioList.appendChild(card);
    });
}

function deletePortfolio(index) {
    portfolios.splice(index, 1);
    renderPortfolios();
}

function handleLogout() {
    loggedInUser = null;
    portfolios = [];

    dashboard.classList.add('hidden');
    loginForm.classList.remove('hidden');

    
    userNameDisplay.textContent = '';
    renderPortfolios();
}
