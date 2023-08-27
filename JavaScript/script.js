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
const password = document.getElementById('password');
const submitBtn = document.getElementById('btn');
let userNameError = document.querySelector('.usernameError');
let passwordError = document.querySelector('.passwordError');

//* Authentication process

function Authentication(e) {
    e.preventDefault();
    const dbRef = ref(db);

    get(child(dbRef, `users/${userName.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val().password);
            let dbPass = decPass(snapshot.val().password);
            console.log(dbPass);
            if (dbPass == password.value) {
                login(snapshot.val());
            }
            else {
                userName.style.border = "1px solid #09c372";
                password.style.border = "1px solid #ff3860";
                userNameError.innerHTML = "";
                passwordError.innerHTML = "Password is wrong.";
            }
        } else {
            userName.style.border = "1px solid #ff3860"; 
            password.style.border = "1px solid #ff3860";
            userNameError.innerHTML = "Username isn't found.";
            passwordError.innerHTML = "";
        }
    });
}


//* Decryption process
function decPass(dbpass) {
    var pass12 = CryptoJS.AES.decrypt(dbpass, "Secret Passphrase");
    return pass12.toString(CryptoJS.enc.Utf8);
}


//* Login process
function login(user) {
    let keepLoggedIn = document.getElementById('keepLoggedIn').checked;

    if (!keepLoggedIn) {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location = "index.html";
    }

    else {
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
        window.location = "index.html";
    }
}


//! Assign the events
submitBtn.addEventListener('click', Authentication); 