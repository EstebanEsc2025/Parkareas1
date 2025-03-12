// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {  getFirestore, getDocs, collection, doc, updateDoc} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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

const stars = document.querySelectorAll('.star');
var cont = 0;
var calificacion = []

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
      getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
      then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            if(doc.data().Id_Parking == localStorage.getItem("id_parking")){
                document.getElementById("titleParking").textContent=doc.data().NombreParqueadero
                document.getElementById("imageParking").src=doc.data().Imagen
                document.getElementById("Subtittle").textContent=doc.data().Subtitulo
                document.getElementById("services").textContent=doc.data().Servicios
                document.getElementById("cost").textContent=doc.data().Costos
                document.getElementById("capacity").textContent=doc.data().Capacidad
                document.getElementById("time").textContent=doc.data().Horarios

            }
        })
      })

      getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
      then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            if(doc.data().Id_Parking == localStorage.getItem("id_parking")){
                for(var i=0; i<doc.data().Reseña.length; i++){
                    var objCalificacion = {
                        Calificacion: doc.data().Reseña[i].Calificacion,
                        Reseña: doc.data().Reseña[i].Reseña,
                        Foto: doc.data().Reseña[i].Foto,
                        Nombre: doc.data().Reseña[i].Nombre,
                        Fecha: doc.data().Reseña[i].Fecha
                    }
                    calificacion.push(objCalificacion)
                }
            }
        })
      })

      enviarReseña.addEventListener("click", (e) =>{
        e.preventDefault();
        var review = document.getElementById("reseña").value;
        var date = new Date()

        if (review.length != 0){
            if(cont != 0){
                getDocs(collection(db, "Users", user.uid, "Private_Data")).
                then((querySnapshot) => {
                    querySnapshot.forEach((doc)=>{
                        if(doc.data().Id == user.uid){
                            var objCalificacion = {
                                Calificacion: cont,
                                Reseña: review,
                                Foto: doc.data().Foto,
                                Nombre: doc.data().Nombre,
                                Fecha: date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
                            }
                            calificacion.push(objCalificacion)
                        }
                    })

                }).then(()=>{
                    getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
                    then((querySnapshot)=>{
                        querySnapshot.forEach((doc2)=>{
                            if(doc2.data().Id_Parking == localStorage.getItem("id_parking")){
                                updateDoc(doc(db, "Propeter", "Parking_id", "Parking", doc2.id),{
                                    Reseña: calificacion
                                }).then(()=>{
                                    Swal.fire({
                                        title: "Correcto",
                                        text: "Se ha subido su reseña correctamente",
                                        icon: "info",
                                      });
                                }).then(()=>{
                                    setTimeout(recarga, 2500)
                                    
                                })
                            }

                        })
    
                    })
                })
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Debe poner una calificación",
                    icon: "error",
                  });
            }
        }else{
            Swal.fire({
                title: "Error",
                text: "Debe digitar una reseña",
                icon: "error",
              });
        }
      })
}})

//..
AgendaButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/Agenda/Agenda.html";
  });



stars.forEach(function(star, parkingPublication){
    star.addEventListener('click', function(){
        cont = 0;
        for (let i=0; i<=parkingPublication; i++){
            stars[i].classList.add('checked');
            cont ++;
            
        }
        for (let i=parkingPublication+1; i<stars.length; i++){
            stars[i].classList.remove('checked');
        }
    })


})

function recarga(){
    window.location.reload()
  }