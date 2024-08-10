import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA6QsEI6ks9GHH62rsVlM8z460ugKetyAE",
    authDomain: "pantrytracker-3ef95.firebaseapp.com",
    projectId: "pantrytracker-3ef95",
    storageBucket: "pantrytracker-3ef95.appspot.com",
    messagingSenderId: "273471130697",
    appId: "1:273471130697:web:787b376d471a3f9aad0398",
    measurementId: "G-D8XH4TLD16"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const addProduct = async (productData, imageUrl) => {
    await addDoc(collection(db, 'products'), { ...productData, imageUrl });
 
};

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
};  

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, 'products', id));
};

export const updateProduct = async (id, newData) => {
  await updateDoc(doc(db, 'products', id), newData);
};