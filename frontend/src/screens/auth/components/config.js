import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3Q6qG1YV32EN2zh5ZXTGGE0prH3b-DSg",
  authDomain: "todolist---app-2ac04.firebaseapp.com",
  projectId: "todolist---app-2ac04",
  storageBucket: "todolist---app-2ac04.appspot.com",
  messagingSenderId: "702796214907",
  appId: "1:702796214907:web:532adbc73c290b6313e8de",
  measurementId: "G-563QTBVZ4M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
