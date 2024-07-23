import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: "olx-clone-80317.firebaseapp.com",
  projectId: "olx-clone-80317",
  storageBucket: "olx-clone-80317.appspot.com",
  messagingSenderId: "1044043739050",
  appId: "1:1044043739050:web:d7f63623449a324a7145d3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const imageDb = getStorage(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await updateProfile(user, {
      displayName: name,
    });

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      displayName: name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

const post = async (title, category, price, url, uid) => {
  try {
    await addDoc(collection(db, "products"), {
      title,
      category,
      price,
      url,
      userId: uid,
      createdAt: new Date().toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (id, title, category, price, url, isImage) => {
  try {
    const docRef = doc(db, "products", id);
    const updatedData = {
      title,
      category,
      price,
      createdAt: new Date().toString(),
    };

    if (isImage) {
      updatedData.url = url;
    }

    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signUp, logout, imageDb, post, editPost };
