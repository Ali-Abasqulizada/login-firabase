//* The Reference 
const header = document.querySelector("#header");
const userLink = document.getElementById('userLink');
const signOutLink = document.getElementById('signOutLink');
let currentUser = null;


//*  Functions 
function getUserName() {
    let keepLoggedIn = localStorage.getItem('keepLoggedIn');

    if (keepLoggedIn == 'yes') {
        currentUser = JSON.parse(localStorage.getItem('user'));
    }
    else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}

function signOut() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('keepLoggedIn');
    window.location.href = "login.html";
}


//* Window Load 
window.onload = function () {
    getUserName();
    if (currentUser == null) {
        header.innerText = "Hello My Friend! Have a good day!";

        userLink.innerText = "Create Account";
        userLink.href = "signUp.html";

        signOutLink.innerText = "Login";
        signOutLink.href = "login.html";
    }
    else {
        header.innerText = `Hello ${currentUser.userName}. Have a good day!`;

        userLink.innerText = currentUser.userName;
        userLink.href = "#";

        signOutLink.innerText = "Sign Out";
        signOutLink.addEventListener("click", signOut);
    }
}