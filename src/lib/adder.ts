import { DocumentReference, FieldValue, addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { db } from "./firebase";
import type { User } from "firebase/auth";

type Pres = {
    content: string,
    style: DocumentReference,
    name: string,
}

export function addPres(user: User, pres: Pres) {
    addDoc(collection(db, `users/${user.uid}/presentations`), {
        ...pres,
        edited:  serverTimestamp()
    })
}