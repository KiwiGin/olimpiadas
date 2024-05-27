// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaZec7bSJii8UVapKo7CfhNYJ3OoHXQWo",
  authDomain: "roomdrile.firebaseapp.com",
  projectId: "roomdrile",
  storageBucket: "roomdrile.appspot.com",
  messagingSenderId: "264125467336",
  appId: "1:264125467336:web:7580f6dc68c995319f33fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service

export const storage = getStorage(app);

export const db = getFirestore(app);


export function uploadImageAvatar(file) {
    const storageRef = ref(storage, 'avatars/'+v4());
    return uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
        // return snapshot;
    });
}