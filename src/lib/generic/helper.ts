import { DocumentReference, FieldValue, addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { db } from "../firebase";
import type { User } from "firebase/auth";

type Pres = {
    content: string,
    style: DocumentReference,
    name: string
}

type Style = {
  name: string,
  value: string
}

export async function addPres(user: User, pres: Pres) {
    return addDoc(collection(db, `users/${user.uid}/presentations`), {
        ...pres,
        edited:  serverTimestamp()
    })
}

export async function addStyle(user: User, style: Style) {
  return addDoc(collection(db, `users/${user.uid}/styles`), style)
}
