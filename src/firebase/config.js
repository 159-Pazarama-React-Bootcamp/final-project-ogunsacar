import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDu6Ogtx0j-EbJpOOJBaecm4xdvePlIdXo",
    authDomain: "pazarama-final-project.firebaseapp.com",
    projectId: "pazarama-final-project",
    storageBucket: "pazarama-final-project.appspot.com",
    messagingSenderId: "583335119247",
    appId: "1:583335119247:web:f47f8f0d511fcae8cb23fa"
  };

// initializing firebase configuration

initializeApp(firebaseConfig)

//adding firebase features

const db = getFirestore() 
const auth = getAuth()
const storage = getStorage()

// exporting these features so i can use where i want

export  {db,auth,storage}