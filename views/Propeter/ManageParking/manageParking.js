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
        querySnapshot.forEach((doc2) => {
          if (doc2.data().Id == user.uid) {
            var sumaReseña=0
            var papa = document.getElementById("container")
            var h1 = document.createElement("h1")
            var div = document.createElement("div")
            var div2 = document.createElement("div")
            var img = document.createElement("img")
            var div3 = document.createElement("div")
       /**/ var div4 = document.createElement("div")
            var h2 = document.createElement("h2")
            var div5 = document.createElement("div")
            var div6 = document.createElement("div")
            var span = document.createElement("span")
       /**/ 
            var button = document.createElement("button")
            var i = document.createElement("i")
            var spanTexto = document.createElement("span")
            var button2 = document.createElement("button")
            var i2 = document.createElement("i")
            var spanTexto2 = document.createElement("span")

            papa.appendChild(h1)
            papa.appendChild(div)
            div.appendChild(div2)
            div.appendChild(div3)
            div.appendChild(div6)
            div2.appendChild(img)
            div3.appendChild(h2)
            div3.appendChild(div4)
            div4.appendChild(span)
            div4.appendChild(div5)

            div6.appendChild(button)
            div6.appendChild(button2)
            button.appendChild(i)
            button.appendChild(spanTexto)
            button2.appendChild(i2)
            button2.appendChild(spanTexto2)

            h1.className = "texto"
            div.className = "parking-info"
            div2.className = "image-container"
            div3.className = "text-info"
            h2.className = "titulo2"
            div4.className = "rating"
            div5.className = "stars"
            
            div6.className = "robaniños"
            button.className = "edit-button"
            i.className = "fa fa-edit"
            button2.className = "delete-button"
            i2.className = "fa fa-trash"
            spanTexto.className = "spanTexto"
            spanTexto2.className = "spanTexto2"
            h1.textContent = "Publicaciones de "+doc2.data().NombreParqueadero
            img.src = doc2.data().Imagen 
            img.style.height="180px"
            img.style.width="280px"
            img.style.objectFit = "cover"
            h2.textContent = "Parqueadero "+doc2.data().NombreParqueadero
            span.textContent = "Calificación Media:"
            
            spanTexto.textContent =" Editar "
            spanTexto2.textContent = " Eliminar"

            for(var i=0; i<doc2.data().Reseña.length;i++){
              sumaReseña=doc2.data().Reseña[i].Calificacion+sumaReseña
            }

            for(var i=0; i<Math.trunc(sumaReseña/doc2.data().Reseña.length);i++){
              var span2 = document.createElement("span")
              span2.className = "star"
              span2.textContent = "⭐"
              div5.appendChild(span2)
            }
          
            button.addEventListener("click", (e) => {
              e.preventDefault();
              localStorage.setItem("id_Publication", doc2.data().Id_Parking);
              location.href = "/views/Propeter/EditingPublication/editingPublication.html";
            });

            button2.addEventListener("click", (e) => {
              e.preventDefault();
              Swal.fire({
                title: "Estas Seguro de Eliminar?",
                text: "No podras revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Borralo!"
              }).then((result) => {
                if (result.isConfirmed) {
                  getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
                  then((querySnapshot)=>{
                    querySnapshot.forEach((doc3)=>{
                      if(doc2.data().Id_Parking==doc3.data().Id_Parking){
                        deleteDoc(doc(db,"Propeter", "Parking_id", "Parking",doc3.id)).
                        then(()=>{
                          Swal.fire({
                            title: "Eliminado!",
                            text: "Tu publicacion ha sido eliminada",
                            icon: "success"
                          });
                        }).then(()=>{
                    
                          setTimeout(recarga, 2500)
                          
                        })

                      }
                    })
                  })

                }
              });
            });
          }
        });
      }
    );
  }
});

function recarga(){
  window.location.reload()
}

