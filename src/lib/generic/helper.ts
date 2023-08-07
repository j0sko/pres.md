import { DocumentReference, FieldValue, addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { db } from "../firebase";
import type { User } from "firebase/auth";

export type Pres = {
    content: string,
    style: DocumentReference,
    name: string
}

export async function addPres(user: User, pres: Pres) {
    return addDoc(collection(db, `users/${user.uid}/presentations`), {
        ...pres,
        edited:  serverTimestamp()
    })
}