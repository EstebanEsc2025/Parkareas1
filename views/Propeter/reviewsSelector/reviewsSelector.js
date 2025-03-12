// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
const db = getFirestore(app);
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    var band = false;
    getDocs(collection(db, "Propeter", user.uid, "Private_Data"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().Id == user.uid) {
            if (doc.data().Rol == "Propeter") {
              band = true;
            }
          }
        });
      })
      .then(() => {
        if (band == false) {
          location.href = "/views/Propeter/PropeterLogin.html";
        }
      });

      getDocs(collection(db, "Propeter", "Parking_id", "Parking")).then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.data().Id == user.uid){
      
            var selector = document.getElementById("box-tittle");

            var div = document.createElement("div");
            var figure = document.createElement("figure");
            var img = document.createElement("img");
            var div2 = document.createElement("div");
            var h2 = document.createElement("h2");
            var button = document.createElement("button");

            selector.appendChild(div);
            div.appendChild(figure);
            div.appendChild(div2);
            figure.appendChild(img);
            div2.appendChild(h2);
            div2.appendChild(button);

            div.className = "item"
            div2.className = "info-product"
            button.className = "inline-buton"
            h2.className = "titulo"
            figure.className = "figura"
            
            img.src=doc.data().Imagen
            button.value = doc.data().Id_Parking
            button.textContent = "Ver Reseñas"
            h2.textContent = doc.data().NombreParqueadero;

            button.addEventListener("click", (e) => {
              e.preventDefault();
              localStorage.setItem("id_parking_review", button.value);
              location.href = "/views/Propeter/reviews/reviews.html";
            });
              }
          });
        }
      );
  }
});

