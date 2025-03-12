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
  }
});

getDocs(collection(db, "Propeter", "Parking_id", "Parking")).then(
  (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().Id_Parking == localStorage.getItem("id_parking_review")) {
        var reviews = document.getElementById("box-tittle");
        var h1 = document.createElement("h1"); /*título reseñas*/
        var h1b = document.createElement("h1"); /*título reseñas*/
        var div33 = document.createElement("div"); /*div hijo contenido reseña*/

        reviews.appendChild(div33);
        div33.appendChild(h1b);
        div33.appendChild(h1);

        h1b.textContent = "Reseñas y Calificacion >";
        h1.textContent = doc.data().NombreParqueadero;

        div33.className = "title-container";
        h1b.className = "caca";
        h1.className = "subtitle";

        for (var i = 0; i < doc.data().Reseña.length; i++) {
          var div2 = document.createElement("div");
          var div3 =document.createElement("div"); /*div hijo contenido reseña*/
          var div4 =document.createElement("div"); /*div hijo2 (rating) reviews section*/
          var h2 = document.createElement("h2");
          var small = document.createElement("small");
          var p = document.createElement("p");
          var imagen = document.createElement("img"); /*imagen reseñas*/
          var e0 = document.createElement("i"); /*icono estrella*/
          var e1 = document.createElement("i"); /*icono estrella*/
          var e2 = document.createElement("i"); /*icono estrella*/
          var e3 = document.createElement("i"); /*icono estrella*/
          var e4 = document.createElement("i"); /*icono estrella*/


          reviews.appendChild(div2);
          div2.appendChild(imagen);
          div2.appendChild(div3);
          div2.appendChild(div4);
          div3.appendChild(h2);
          div3.appendChild(small);
          div3.appendChild(p);

          if (doc.data().Reseña[i].Foto == "") {
            imagen.src ="https://firebasestorage.googleapis.com/v0/b/parkareas-ebf15.appspot.com/o/ImagenesPredeterminadas%2FImagenesPerfil%2Fpic-1.jpg?alt=media&token=49bc1381-0e04-4aba-8351-78090b3a72a1";
          } else {
            imagen.src = doc.data().Reseña[i].Foto;
          }
          h2.textContent = doc.data().Reseña[i].Nombre;
          small.textContent = doc.data().Reseña[i].Fecha;
          p.textContent = doc.data().Reseña[i].Reseña;

          if (doc.data().Reseña[i].Calificacion == 5) {
            div4.appendChild(e0);
            div4.appendChild(e1);
            div4.appendChild(e2);
            div4.appendChild(e3);
            div4.appendChild(e4);
          }
          if (doc.data().Reseña[i].Calificacion == 4) {
            div4.appendChild(e0);
            div4.appendChild(e1);
            div4.appendChild(e2);
            div4.appendChild(e3);
          }
          if (doc.data().Reseña[i].Calificacion == 3) {
            div4.appendChild(e0);
            div4.appendChild(e1);
            div4.appendChild(e2);
          }
          if (doc.data().Reseña[i].Calificacion == 2) {
            div4.appendChild(e0);
            div4.appendChild(e1);
          }
          if (doc.data().Reseña[i].Calificacion == 1) {
            div4.appendChild(e0);
          }
        
          div2.className = "review-card";
          
          div3.className = "review-content";
          div4.className = "stars-rating";
          imagen.className = "profile-pic";
          e0.className = "bi bi-star-fill star";
          e1.className = "bi bi-star-fill star";
          e2.className = "bi bi-star-fill star";
          e3.className = "bi bi-star-fill star";
          e4.className = "bi bi-star-fill star";
        }
      }
    });
  }
);
