import { goto } from '$app/navigation';
import type { User } from 'firebase/auth';
import type { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { writable, type Writable } from 'svelte/store';
export const user: Writable<User | Object> = writable<User | Object>({uid: 'placeholder', placeholder: true}, () => {
  const unsubscribe = user.subscribe((value)=> {
    if (value.hasOwnProperty('placeholder') == true) {
      goto('/');
    }
  });
  return unsubscribe;
});
export const windowContext = writable<QueryDocumentSnapshot | null>(null);
export const moving = writable<Boolean>(false);
