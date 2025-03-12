// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, getDocs, collection, doc, updateDoc, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
        var band = false
        getDocs(collection(db, "Users", user.uid, "Private_Data")).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().Id == user.uid) {
                        if (doc.data().Rol == 'Usuario') {
                            band = true
                        }
                    }
                })

            }).then(() => {
                if (band == false) {
                    location.href = "/views/User/Login/Login.html"
                }

            })

        getDocs(collection(db, "Solicitud", "Id_solicitud", "data_solicitud")).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
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
            }).then(() => {
                for (var i = 0; i < citas.length; i++) {
                    citas[i].start = new Date(citas[i].start)
                }
                let calendarEl = document.getElementById('calendar');
                let frm = document.getElementById('formulario');
                let eliminar = document.getElementById('btnEliminar');
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
                    editable: true,
                    dateClick: function (info) {
                        frm.reset()
                        eliminar.classList.add('d-none');
                        document.getElementById('start').value = info.dateStr + "T00:00";
                        document.getElementById('btnAccion').textContent = 'Registrar';
                        document.getElementById('titulo').textContent = 'Registrar Cita';
                        myModal.show();
                    },

                    eventClick: function (info) {
                        getDocs(collection(db,  "Solicitud", "Id_solicitud", "data_solicitud")).
                            then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (info.event.id == doc.data().Cedula) {
                                        document.getElementById('start').value = doc.data().Fecha;
                                        document.getElementById('name').value = doc.data().Nombre;
                                        document.getElementById('telefono').value = doc.data().Telefono;
                                        document.getElementById('cedula').value = doc.data().Cedula;
                                        document.getElementById('color').value = doc.data().Color;
                                        document.getElementById('btnAccion').textContent = 'Modificar';
                                        document.getElementById('titulo').textContent = 'Actualizar Cita';
                                        eliminar.classList.remove('d-none');
                                        myModal.show();
                                    }
                                })
                            })
                    }

                })
                calendar.render();
                frm.addEventListener("submit", function (e) {
                    e.preventDefault();
                    var fecha = document.getElementById("start").value
                    var nombre = document.getElementById("name").value
                    var telefono = document.getElementById("telefono").value
                    var cedula = document.getElementById("cedula").value
                    var color = document.getElementById("color").value

                    if (fecha.length != 0 && nombre.length != 0 && telefono.length != 0 && cedula.length != 0 && color.length != 0) {

                        if (document.getElementById('titulo').textContent == 'Registrar Cita') {
                            addDoc(collection(db,  "Solicitud", "Id_solicitud", "data_solicitud"), {
                                Cedula: cedula,
                                Fecha: fecha,
                                Nombre: nombre,
                                Telefono: telefono,
                                Color: color,
                                Id_parking: localStorage.getItem('id_parking'),
                                Id_user: user.uid
                            }).then(() => {
                                myModal.hide();
                                calendar.refetchEvents();
                            }).then(() => {
                                window.location.reload()
                            })

                        }
                        else if (document.getElementById('titulo').textContent == 'Actualizar Cita') {
                            getDocs(collection(db,  "Solicitud", "Id_solicitud", "data_solicitud")).
                                then((querySnapshot) => {
                                    querySnapshot.forEach((doc2) => {
                                        if (doc2.data().Cedula == cedula) {
                                            updateDoc(doc(db,  "Solicitud", "Id_solicitud", "data_solicitud", doc2.id), {
                                                Cedula: cedula,
                                                Fecha: fecha,
                                                Nombre: nombre,
                                                Telefono: telefono,
                                                Color: color,
                                                Id_parking: localStorage.getItem('id_parking'),
                                                Id_user: user.uid
                                            }).then(() => {
                                                myModal.hide();
                                                calendar.refetchEvents();
                                            }).then(() => {
                                                window.location.reload()
                                            })
                                        }


                                    })
                                })
                        }
                    }
                    else {
                        Swal.fire({
                            title: "Error",
                            text: "Debe digitar todos los datos",
                            icon: "error",
                        });
                    }
                })

                eliminar.addEventListener('click', function (e) {
                    myModal.hide();
                    e.preventDefault();
                    var cedula = document.getElementById("cedula").value
                    Swal.fire({
                        title: 'Advertencia',
                        text: "¿Está seguro de eliminar la cita?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, elimínala'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            getDocs(collection(db,  "Solicitud", "Id_solicitud", "data_solicitud")).
                                then((querySnapshot) => {
                                    querySnapshot.forEach((doc2) => {
                                        if (doc2.data().Cedula == cedula) {
                                            deleteDoc(doc(db,  "Solicitud", "Id_solicitud", "data_solicitud", doc2.id)).
                                                then(() => {
                                                    myModal.hide();
                                                    calendar.refetchEvents();
                                                }).then(() => {
                                                    window.location.reload()
                                                })
                                        }
                                    })
                                })
                        }
                    })
                })

            })
    }
})

