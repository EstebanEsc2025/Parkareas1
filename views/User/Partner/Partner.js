// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {  getFirestore, getDocs, collection, doc} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
}})

//..
PlusServicesButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/Plus Services/plusServices.html";
  });

  talkWithAdmin.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/talkAdmin/talkAdmin.html";
  });

  BuyBottonG.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/Buy2/Buy2.html";
  });

  StatusButton.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/views/User/Status/Status.html";
  });