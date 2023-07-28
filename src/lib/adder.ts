import { addDoc, collection, doc } from "firebase/firestore/lite";
import { db } from "./firebase";
export async function addPres(user: object, content: string, name: string) {
   await addDoc(collection(db, `users/${(<any>user).uid}/presentations`), {'content': content, 'name': name})
   //TODO: make user work
}