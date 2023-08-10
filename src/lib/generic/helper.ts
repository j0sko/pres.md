import { DocumentReference,  addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { db } from "../firebase";
import type { User } from "firebase/auth";

export type Pres = {
    content: string,
    style: DocumentReference,
    name: string
}

export type Style = {
  name: string,
  value: string
}

export interface Placeholder {
  uid: string,
  placeholder: boolean,
}

export async function addPres(user: User | Placeholder, pres: Pres) {
    return addDoc(collection(db, `users/${user.uid}/presentations`), {
        ...pres,
        edited:  serverTimestamp()
    })
}

export async function addStyle(user: User | Placeholder, style: Style) {
  return addDoc(collection(db, `users/${user.uid}/styles`), style)
}
