import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiSSiAYvPpK4-iEJd-_xUDKuBEd3mfTNg",
  authDomain: "manage-storage.firebaseapp.com",
  projectId: "manage-storage",
  storageBucket: "manage-storage.appspot.com",
  messagingSenderId: "919841100036",
  appId: "1:919841100036:web:b8f27207dbcdc4ea148051",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
