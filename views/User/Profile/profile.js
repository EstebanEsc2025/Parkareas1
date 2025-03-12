// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {  getFirestore, getDocs, collection, doc} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {getStorage,ref,uploadBytesResumable, getDownloadURL,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use

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
      var band = false
      getDocs(collection(db, "Users", user.uid, "Private_Data")).
      then((querySnapshot) => {
          querySnapshot.forEach((doc)=>{           
            if (doc.data().Id == user.uid){
                  if(doc.data().Rol == 'Usuario'){
                      band=true
                      getDocs(collection(db, "User", user.uid, "Private_Data")).then(
                        (querySnapshot) => {
                          querySnapshot.forEach((doc) => {
                            if (doc.data().Id == user.uid) {
                              document.getElementById("title3").textContent = '' + doc.data().Nombre;
                            }
                          });
                        }
                      );
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
          if(doc.data().Foto == ''){
            document.getElementById("Pfp3").src="https://firebasestorage.googleapis.com/v0/b/parkareas-ebf15.appspot.com/o/ImagenesPredeterminadas%2FImagenesPerfil%2Fpic-1.jpg?alt=media&token=49bc1381-0e04-4aba-8351-78090b3a72a1"
          }
          else{
            document.getElementById("Pfp3").src=doc.data().Foto
          }
        })
      })
}})

