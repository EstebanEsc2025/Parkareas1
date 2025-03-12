// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getFirestore,  getDocs, collection,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
    measurementId: "G-FNY8FYCPWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const db = getFirestore(app)

Propeterlogin.addEventListener('click', (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    if (email.length != 0 && password.length != 0) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                var band = false
                if (getAuth().currentUser.emailVerified) {
                    getDocs(collection(db, "Propeter", user.uid, "Private_Data")).
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc)=>{
                            if (doc.data().Id == user.uid){
                                if(doc.data().Rol == 'Propeter'){
                                    band=true
                                    location.href = "/views/Propeter/PropeterHOME/PropeterHome.html";
                                }
                            }
                        })

                    }).then(()=>{
                        if(band==false){
                            alert("Error, el usuario no es propietario")
                        }

                    })
                    
                }
                else {    // ...
                    Swal.fire({
                        title: "Error",
                        text: "Debes verificar el correo",
                        icon: "error"
                    });
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                Swal.fire({
                    title: "Error",
                    text: errorMessage,
                    icon: "error"
                });
            });

    }
    else {
        Swal.fire({
            title: "Error",
            text: "Debe digitar todos los datos",
            icon: "error"
        });
    }
})

