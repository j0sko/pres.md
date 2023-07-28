import { writable } from 'svelte/store';
export const user = writable<any>(null);
export const token = writable<null | string>(null);
