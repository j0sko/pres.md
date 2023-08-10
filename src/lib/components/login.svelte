<script lang="ts">
	import { githubProvider, googleProvider, auth, db } from '$lib/firebase.js';
	import {
		GithubAuthProvider,
		GoogleAuthProvider,
		signInWithPopup,
	} from 'firebase/auth';
	import { user } from '$lib/stores.js'
	import { goto } from '$app/navigation';
	import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

	async function login(provider: GoogleAuthProvider | GithubAuthProvider) {
		signInWithPopup(auth, provider)
			.then((result) => {
					// token.set(credential.accessToken);
					user.set(result.user);
        const docRef = doc(db, 'users', result.user.uid);
        getDoc(docRef).then((r) => {
          if (r.exists()) {
            goto('/overview');
          } else {
            setDoc(docRef, {used: 0}).then(() => goto('/overview'));
          }
        })
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<button
	on:click={(_) => {
		login(googleProvider);
	}}
>
	Login with Google</button
>

<button
	on:click={(_) => {
		login(githubProvider);
	}}
>
	Login with GitHub</button
>
