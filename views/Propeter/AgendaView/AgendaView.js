// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {getAuth,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {getFirestore,getDocs,collection,deleteDoc,doc,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
var citas = []

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

        getDocs(collection(db, "Agendas", "Id_cita", "data_cita")).
        then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{

                var citasObj = {
                    id: '',
                    start: '',
                    title: '',
                    color: '',
                }
                citasObj.id = doc.data().Cedula
                citasObj.start = doc.data().Fecha
                citasObj.name = doc.data().Nombre
                citasObj.color = doc.data().Color
                citas.push(citasObj)
            })
        }).then(()=>{
            let calendarEl = document.getElementById('calendar');
                let myModal = new bootstrap.Modal(document.getElementById('myModal'));
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    timeZone: 'local',
                    initialView: 'dayGridMonth',
                    locale: 'es',
                    firstDay: 1,
                    headerToolbar: {
                        left: 'prev next today',
                        center: 'title',
                        right: 'dayGridMonth'
                    },
                    events: citas,
                    editable: false,
                    eventClick: function (info) {
                        getDocs(collection(db, "Agendas", "Id_cita", "data_cita")).
                            then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (info.event.id == doc.data().Cedula) {
                                        document.getElementById('start').value = doc.data().Fecha;
                                        document.getElementById('name').value = doc.data().Nombre;
                                        document.getElementById('telefono').value = doc.data().Telefono;
                                        document.getElementById('cedula').value = doc.data().Cedula;
                                        document.getElementById('color').value = doc.data().Color;
                                        myModal.show();
                                    }
                                })
                            })
                    }

                })
                calendar.render();
        })
    }
});