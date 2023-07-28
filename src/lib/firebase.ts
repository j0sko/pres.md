// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	getAuth,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDfgZRz1or4CjxvO7UgvjBBj9HfjDqpkEA',
	authDomain: 'mdpres-f3f60.firebaseapp.com',
	projectId: 'mdpres-f3f60',
	storageBucket: 'mdpres-f3f60.appspot.com',
	messagingSenderId: '279390992742',
	appId: '1:279390992742:web:b137fe051f3a3bf0c2f0a7',
	measurementId: 'G-464S3SYLPQ',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
//Export auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
