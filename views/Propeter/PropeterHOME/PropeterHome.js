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
              getDocs(
                collection(db, "Propeter", user.uid, "Private_Data")
              ).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if (doc.data().Id == user.uid) {
                    document.getElementById("title").textContent =
                      "Propietario, " + doc.data().Nombre;
                  }
                });
              });
            }
          }
        });
      })
      .then(() => {
        if (band == false) {
          location.href = "/views/Propeter/PropeterLogin/PropeterLogin.html";
        }
      });

    //..
    delete2.addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Estas Seguro de Eliminar tu usuario?",
        text: "No podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Borrar",
      }).then((result) => {
        if (result.isConfirmed) {
          const user = auth.currentUser;
          deleteUser(user).then(() => {
            location.href = "/index.html";
          });
        }
      });
    });

    PropeterlogoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        location.href = "/index.html";
      });
    });

    changePasswordButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.href =
        "/views/Propeter/PropeterChangePassword/PropeterChangePassword.html";
    });

    PublicationButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "/views/Propeter/Publications/Publications.html";
    });

    reportsButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "/views/Propeter/reports/reports.html";
    });

    reviewsButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "/views/Propeter/reviewsSelector/reviewsSelector.html";
    });

    reservesButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "/views/Propeter/reserves/reserves.html";
    });

    agendasButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "/views/Propeter/AgendaView/AgendaView.html";
    });

    profileButton2.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "/views/Propeter/PropeterProfile/PropeterProfile.html";
    });

    manageParkingButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "/views/Propeter/ManageParking/manageParking.html";
    });
  } else {
    window.location.href = "/index.html";
  }
});
