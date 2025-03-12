// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getFirestore, addDoc, collection,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo53XRX6-_Krf9_9SiRoRglcTLcAVdGP0",
  authDomain: "parkareas-ebf15.firebaseapp.com",
  projectId: "parkareas-ebf15",
  storageBucket: "parkareas-ebf15.appspot.com",
  messagingSenderId: "34123792795",
  appId: "1:34123792795:web:bb7127e7bd1c863c6ce13e",
  measurementId: "G-FNY8FYCPWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const db = getFirestore(app);

PropeterRegister.addEventListener("click", (e) => {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var documents = document.getElementById("documents").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (
    name.length != 0 &&
    documents.length != 0 &&
    email.length != 0 &&
    password.length != 0
  ) {
    if (confirmPassword == password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...

          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                title: "Hecho",
                icon: "success",
                title:
                  "El usuario se registro de manera correcta, verifica tu correo",
              });
            })
            .then(() => {
              addDoc(collection(db, "Propeter", user.uid, "Private_Data"), {
                Nombre: name,
                Documento: documents,
                Numero: number,
                Correo: email,
                Id: user.uid,
                Rol: "Propeter",
                Foto:''
              });
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Error",
      text: "Debe digitar todos los datos",
      icon: "error",
    });
  }
});
