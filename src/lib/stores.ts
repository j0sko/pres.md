import type { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { writable } from 'svelte/store';
export const user = writable<any>(null);
export const windowContext = writable<QueryDocumentSnapshot | null>(null);
