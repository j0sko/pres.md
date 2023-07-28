<script lang="ts">
	import { githubProvider, googleProvider, auth } from '$lib/firebase.js';
	import {
		GithubAuthProvider,
		GoogleAuthProvider,
		signInWithPopup,
	} from 'firebase/auth';
	import { user } from '$lib/stores.js'
	import { goto } from '$app/navigation';

	function login(provider: GoogleAuthProvider | GithubAuthProvider) {
		signInWithPopup(auth, provider)
			.then((result) => {
				if (provider instanceof GoogleAuthProvider) {
					const credential = GoogleAuthProvider.credentialFromResult(result);
					// token.set(credential.accessToken);
					user.set(result.user);
					
				} else if (provider instanceof GithubAuthProvider) {
					const credential = GithubAuthProvider.credentialFromResult(result);
					// token.set(credential.accessToken);
					user.set(result.user);
				}
			goto('/overview');
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
