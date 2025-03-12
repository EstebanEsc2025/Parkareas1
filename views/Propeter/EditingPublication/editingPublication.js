// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, getDocs, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
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
const storage = getStorage();

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

    getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
      then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().Id_Parking == localStorage.getItem("id_Publication")) {
            document.getElementById("parkName").value = doc.data().NombreParqueadero
            document.getElementById("image").src = doc.data().Imagen
            document.getElementById("Subtittle1").textContent = doc.data().Subtitulo
            document.getElementById("Services").textContent = doc.data().Servicios
            document.getElementById("Cost").textContent = doc.data().Costos
            document.getElementById("Time").textContent = doc.data().Horarios
            document.getElementById("Capacity").textContent = doc.data().Capacidad
          }
        })
      })

    PublishButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (document.getElementById("image").value.length == 0) {
        var name = document.getElementById("parkName").value;
        var subtittle = document.getElementById("Subtittle1").value;
        var services = document.getElementById("Services").value;
        var cost = document.getElementById("Cost").value;
        var time = document.getElementById("Time").value;
        var capacity = document.getElementById("Capacity").value;
        getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
          then((querySnapshot) => {
            querySnapshot.forEach((doc2) => {
              if (doc2.data().Id_Parking == localStorage.getItem("id_Publication")) {
                updateDoc(doc(db, "Propeter", "Parking_id", "Parking", doc2.id), {
                  NombreParqueadero: name,
                  Subtitulo: subtittle,
                  Servicios: services,
                  Costos: cost,
                  Capacidad: capacity,
                  Horarios: time,
                }).then(() => {
                  Swal.fire({
                    title: "Correcto",
                    text: "Se actualizó correctamente",
                    icon: "success",
                  });
                }).then(() => {

                  setTimeout(recarga, 2500)

                })
              }
            })
          })
      } else {
        var name = document.getElementById("parkName").value;
        var subtittle = document.getElementById("Subtittle1").value;
        var services = document.getElementById("Services").value;
        var cost = document.getElementById("Cost").value;
        var time = document.getElementById("Time").value;
        var capacity = document.getElementById("Capacity").value;
        var image = document.getElementById("image");



        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "Parqueaderos/" + user.uid + '/' + image.files[0].name);
        const uploadTask = uploadBytesResumable(storageRef, image.files[0]);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              getDocs(collection(db, "Propeter", "Parking_id", "Parking")).
                then((querySnapshot) => {
                  querySnapshot.forEach((doc2) => {
                    if (doc2.data().Id_Parking == localStorage.getItem("id_Publication")) {
                      updateDoc(doc(db, "Propeter", "Parking_id", "Parking", doc2.id), {
                        NombreParqueadero: name,
                        Subtitulo: subtittle,
                        Servicios: services,
                        Costos: cost,
                        Capacidad: capacity,
                        Imagen: downloadURL,
                        Horarios: time,
                      }).then(() => {
                        Swal.fire({
                          title: "Correcto",
                          text: "Se actualizó correctamente",
                          icon: "success",
                        });
                      }).then(() => {

                        setTimeout(recarga, 2500)

                      })
                    }
                  })
                })

            });
          }
        );
      }
    });
  }
})

function recarga() {
  window.location.reload()
}