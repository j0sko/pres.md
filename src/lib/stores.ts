import { goto } from '$app/navigation';
import type { User } from 'firebase/auth';
import type { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { writable, type Writable } from 'svelte/store';
import type { Placeholder } from './generic/helper';

export const user: Writable<User | Placeholder> = writable<User | Placeholder>({uid: 'placeholder', placeholder: true}, () => {
  const unsubscribe = user.subscribe((value)=> {
    if (value.hasOwnProperty('placeholder') == true && !import.meta.env.SSR && window.location.pathname != '/') {
      goto('/');
    }
  });
  return unsubscribe;
});

export const windowContext = writable<QueryDocumentSnapshot | null>(null);
export const moving = writable<Boolean>(false);
