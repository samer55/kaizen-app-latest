// import and configure firebase
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCqPdp9DaKuTDRkkLE9tEeTMEwmsp6X_I8",
   authDomain: "kaizen-1c7ff.firebaseapp.com",
   databaseURL: "https://kaizen-1c7ff.firebaseio.com",
   projectId: "kaizen-1c7ff",
   storageBucket: "kaizen-1c7ff.appspot.com",
   messagingSenderId: "767526000814",
   appId: "1:767526000814:web:9d342cd73c4e4561"
}
export const firebaseApp = firebase.initializeApp(firebaseConfig)
