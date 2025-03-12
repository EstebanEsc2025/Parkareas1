// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {getAuth, updatePassword, signOut, onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {  getFirestore, getDocs, collection,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    var band = false
    getDocs(collection(db, "Users", user.uid, "Private_Data")).
    then((querySnapshot) => {
        querySnapshot.forEach((doc)=>{           
          if (doc.data().Id == user.uid){
                if(doc.data().Rol == 'Usuario'){
                    band=true
                }
            }
        })

    }).then(()=>{
        if(band==false){
            location.href = "/views/User/Login/Login.html"
        }

    })

    //..
    const uid = user.uid;
    const passwordInput = document.getElementById("password");
    const passwordVerifyInput = document.getElementById("passwordverify");
    const changeButton = document.getElementById("change");

    changeButton.addEventListener("click", (e) => {
      e.preventDefault();

      const newPassword = passwordInput.value;
      const verifyPassword = passwordVerifyInput.value;

      if (newPassword !== verifyPassword) {
        Swal.fire({
          icon: "error",
          text: "Las contraseñas deben coincidir",
          title: "Error",
        });
        return;
      }

      updatePassword(user, newPassword)
        .then(() => {
          Swal.fire({
            title: "",
            text: "Haz actualizado tu contraseña con éxito. Vuelve a iniciar sesión",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              location.href = "/Supermercado/Login/Login.html";
              signOut(auth)
                .then(() => {})
                .catch((error) => {});
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: "Ha ocurrido un error al actualizar la contraseña",
            title: "Error",
          });
          console.error("Error updating password:", error);
        });
    });
  } else {
    location.href = "/index.html";
  }
});