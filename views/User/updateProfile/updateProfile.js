// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getFirestore, updateDoc, getDocs, collection, doc,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {getStorage,ref,uploadBytesResumable, getDownloadURL,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const user = auth.currentUser;
const storage = getStorage();

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

    getDocs(collection(db, "Users", user.uid, "Private_Data")).
    then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        document.getElementById("name").value=doc.data().Nombre
        document.getElementById("documents").value=doc.data().Documento
        document.getElementById("number").value=doc.data().Numero

        if(doc.data().Foto == ''){
          document.getElementById("Pfp").src="https://firebasestorage.googleapis.com/v0/b/parkareas-ebf15.appspot.com/o/ImagenesPredeterminadas%2FImagenesPerfil%2Fpic-1.jpg?alt=media&token=49bc1381-0e04-4aba-8351-78090b3a72a1"
        }
        else{
          document.getElementById("Pfp").src=doc.data().Foto
        }
      })
    })
    updateProfile.addEventListener("click", (e) => {
      e.preventDefault();

      var name = document.getElementById("name").value;
      var documents = document.getElementById("documents").value;
      var number = document.getElementById("number").value;
      var image = document.getElementById("image");
      var image2 = document.getElementById("image").value;
      
      if(image2.length!=0){
         // Upload file and metadata to the object 'images/mountains.jpg'
         const storageRef = ref(storage, "profileFotosUsuario/"+user.uid+'/'+image.files[0].name);
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
               getDocs(collection(db, "Users", user.uid, "Private_Data"))
               .then((querySnapshot)=>{
                 querySnapshot.forEach((docB) => {
                   if(docB.data().Id === user.uid){
                       updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                         Foto: downloadURL,
                       });
                   }
                 })
               })                
             });
           }
         );
     }


      getDocs(collection(db, "Users", user.uid, "Private_Data")).then(
        (querySnapshot) => {
          querySnapshot.forEach((docB) => {
            if (docB.data().Id == user.uid) {
              if (name.length != 0 && documents.length == 0 && number.length == 0) {
                updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                  Nombre: name,
                });
              }
              else if (documents.length == 0 && number.length != 0 && name.length != 0) {
                updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                  Nombre: name,
                  Numero: number,
                });
              }
              else if (documents.length != 0 && number.length == 0 && name.length != 0) {
                updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                  Nombre: name,
                  Documento: documents,
                });
              }
              else if (documents.length != 0 && number.length == 0 && name.length == 0) {
                updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                  Documento: documents,
                });
              }
              else if (documents.length != 0 && number.length != 0 && name.length == 0) {
                updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                  Documento: documents,
                  Numero: number,
                });
              }
              else if (number.length != 0 && documents.length == 0 && name.length == 0) {
                updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                  Numero: number,
                });
              }
              else if (documents.length != 0 && number.length != 0 && name.length != 0) {
                updateDoc(doc(db, "Users", user.uid, "Private_Data", docB.id), {
                  Nombre: name,
                  Numero: number,
                  Documento: documents,
                });
              }
            }
          })
    })
    .then(()=>{
       Swal.fire({
            title: "Hecho",
            icon: "success",
            title: "Se actualizaron los datos correctamente",
            //timer: 1500
          }).then(()=>{
            window.location.reload()
          })
    })
  })
  }
});
