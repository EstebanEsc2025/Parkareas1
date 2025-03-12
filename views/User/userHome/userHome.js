// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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

onAuthStateChanged(auth, (user) => {
  if (user) {
    var band = false

    getDocs(collection(db, "Users", user.uid, "Private_Data")).
      then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if ((doc.data().Id == user.uid)) {
            if (doc.data().Afiliacion != '') {
              localStorage.setItem('afiliacion',doc.data().Afiliacion)

              var papas = document.getElementById("papas")

              var button = document.createElement("button");

              papas.appendChild(button);

              button.className = "affiliate-button"
              button.textContent = "Afiliado a " + doc.data().Afiliacion

              var casa = document.getElementById("casa")

              var li = document.createElement("li")
              var button2 = document.createElement("button");
              var i = document.createElement("i");
              var span = document.createElement("span");

              casa.appendChild(button2);
              button2.appendChild(i)
              button2.appendChild(span)
              
              i.className = "bx bxs-briefcase"
              span.className = "link-name"
              span.textContent = "Afiliación"


              button2.addEventListener("click", (e) => {
                e.preventDefault();
                location.href = "/views/User/Partner/Partner.html";
              });
            }
          }
        })
      })

    getDocs(collection(db, "Users", user.uid, "Private_Data")).
      then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().Id == user.uid) {
            if (doc.data().Rol == 'Usuario') {
              band = true
              getDocs(collection(db, "Users", user.uid, "Private_Data")).then(
                (querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    if (doc.data().Id == user.uid) {
                      document.getElementById("title").textContent =
                        "Bienvenido " + doc.data().Nombre;
                    }
                  });
                }
              );
            }
          }
        })

      }).then(() => {
        if (band == false) {
          location.href = "/views/User/Login/Login.html"
        }

      })


    getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
      then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var publication = document.getElementById("publication")

          var div = document.createElement("div")
          var div2 = document.createElement("div")
          var imagen = document.createElement("img")
          var div4 = document.createElement("div")
          var texto = document.createElement("h3")
          var span = document.createElement("span")
          var div5 = document.createElement("div")
          var imagen2 = document.createElement("img")
          var texto2 = document.createElement("h3")
          var link = document.createElement("a")

          publication.appendChild(div)
          div.appendChild(div2)
          div.appendChild(div5)
          div.appendChild(texto2)
          div.appendChild(link)
          div2.appendChild(imagen)
          div2.appendChild(div4)
          div4.appendChild(texto)
          div4.appendChild(span)
          div5.appendChild(imagen2)

          div.className = "box"
          div2.className = "tutor"
          div4.className = "info"
          div5.className = "thumb"
          texto2.className = "title"
          link.className = "inline-btn"

          span.textContent = doc.data().Fecha
          imagen2.src = doc.data().Imagen
          texto2.textContent = doc.data().NombreParqueadero
          link.textContent = "Revisar Parqueadero"
          link.value = doc.data().Id_Parking

          getDocs(collection(db, "Propeter", doc.data().Id, "Private_Data")).
            then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.data().Foto == '') {
                  imagen.src = "https://firebasestorage.googleapis.com/v0/b/parkareas-ebf15.appspot.com/o/ImagenesPredeterminadas%2FImagenesPerfil%2Fpic-1.jpg?alt=media&token=49bc1381-0e04-4aba-8351-78090b3a72a1"
                }
                else {
                  imagen.src = doc.data().Foto

                }
                texto.textContent = doc.data().Nombre
              })
            })

          link.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("id_parking", link.value)
            location.href = "/views/User/ParkingPublication/parkingPublication.html";
          })



        })
      })

    //..
    delete1.addEventListener("click", (e) => {
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


    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        location.href = "/index.html";
      });
    });
  } else {
    window.location.href = "/index.html";
  }
  changePasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/updatePassword/updatePassword.html";
  });

  talkAdmin.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/talkAdmin/talkAdmin.html";
  });


  profileButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/Profile/profile.html";
  });

});
