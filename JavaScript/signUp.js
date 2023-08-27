// Import the functions you need from the SDKs you need
import { child, get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHY_qFjNaEX6Xo3kmTEmyaX2PmbsDuAf4",
    authDomain: "new-login-95f56.firebaseapp.com",
    projectId: "new-login-95f56",
    storageBucket: "new-login-95f56.appspot.com",
    messagingSenderId: "1075474280533",
    appId: "1:1075474280533:web:33c41bdfbc38be3acce4dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()

//* The Reference 
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const submitBtn = document.getElementById('btn');
let userNameError = document.querySelector('.usernameError');
let emailError = document.querySelector('.emailError');
let passwordError = document.querySelector('.passwordError');
let password2Error = document.querySelector('.password2Error');

//* Validation
function isEmptySpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function Validation() {
    const emailregex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordregex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (isEmptySpaces(userName.value)) {
        userName.style.border = "1px solid #ff3860";
        userNameError.innerHTML = "Please enter a name."
        return false;
    }
    if (isEmptySpaces(email.value)) {
        userName.style.border = "1px solid #09c372";
        email.style.border = "1px solid #ff3860";
        userNameError.innerHTML = "";
        emailError.innerHTML = "Please enter a email.";
        return false;
    }
    if (!emailregex.test(email.value)) {
        userName.style.border = "1px solid #09c372";
        email.style.border = "1px solid #ff3860";
        userNameError.innerHTML = "";
        emailError.innerHTML = "Please enter a VALID email.";
        return false;
    }
    if (isEmptySpaces(password.value)) {
        userName.style.border = "1px solid #09c372";
        email.style.border = "1px solid #09c372";
        password.style.border = "1px solid #ff3860";
        userNameError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "Please enter a password."
        return false;
    }
    if (!passwordregex.test(password.value)) {
        userName.style.border = "1px solid #09c372";
        email.style.border = "1px solid #09c372";
        password.style.border = "1px solid #ff3860";
        userNameError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "Please enter a VALID password.";
        return false;
    }
    if (isEmptySpaces(password2.value)) {
        userName.style.border = "1px solid #09c372";
        email.style.border = "1px solid #09c372";
        password.style.border = "1px solid #09c372";
        password2.style.border = "1px solid #ff3860";
        userNameError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "";
        password2Error.innerHTML = "Please confirm your password.";
        return false;
    }
    if (password2.value !== password.value) {
        userName.style.border = "1px solid #09c372";
        email.style.border = "1px solid #09c372";
        password.style.border = "1px solid #09c372";
        password2.style.border = "1px solid #ff3860";
        userNameError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "";
        password2Error.innerHTML = "Passwords are not same.";
        return false;
    }
    userName.style.border = "1px solid #09c372";
    email.style.border = "1px solid #09c372";
    password.style.border = "1px solid #09c372";
    password2.style.border = "1px solid #09c372";
    userNameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    password2Error.innerHTML = "";
    return true;
}

//! Register User to Firebase
function registerUser(e) {
    e.preventDefault();
    if (!Validation()) return;
    const dbRef = ref(db);

    get(child(dbRef, `users/${userName.value}`)).then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.exists()) {
            alert('User already exists');
        } else {
            set(ref(db, `users/${userName.value}`), {
                userName: userName.value,
                email: email.value,
                password: encryptPassword(),
            }).then(() => {
                alert('USER ADDED SUCCESSFULLY!!!');
            }).catch((error) => {
                alert('Error: ' + error.message);
            })

            window.location.href = "login.html";
        }
    });
}

//? Encrypting Password
function encryptPassword() {
    var pass12 = CryptoJS.AES.encrypt(password.value, "Secret Passphrase");
    return pass12.toString();
}

//? Assigning Event Listeners
submitBtn.addEventListener('click', registerUser); 