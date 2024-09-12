<script lang="ts">
	import { goto } from "$app/navigation";
  import { Github } from "lucide-svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
	import z from "zod";
	let { supabase } = data;
	$: ({ supabase } = data);
	let email: string;
	let password: string;
	let loginProcessing = false;
	let errorText = "";

	// supabase.auth.getSession().then((session) => {
	// 	console.log(session);
	// });

	const emailSignIn = async () => {
		loginProcessing = true;
		let { success } = z.string().email().safeParse(email);
		if (!success) {
			errorText = "Please enter a valid email";
			loginProcessing = false;
			return;
		}
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			errorText = error.message;
			loginProcessing = false;
		} else {
			goto("/dashboard");
		}
	};

	async function githubSignIn() {
		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<section
	class="misty-waves h-fit min-h-screen flex items-center justify-center w-full"
>
	<div
		class="w-full min-w-fit max-w-xl h-fit flex items-center flex-col space-y-5 my-32 mx-5 pt-10 pb-5 rounded-xl"
	>
		<h1 class="text-center text-3xl font-bold text-gray-200 mb-5">Log in to your account</h1>
		<div class="w-full px-5">
			<button
				class="btn solid morningGreen flex-grow w-full"
				on:click={() => {
					githubSignIn();
				}}>Continue with Github
				<Github/>
				</button
			>
		</div>
		<div class="divider px-5 info">or</div>
		<p class="text-center font-semibold text-gray-200">
			Enter your account credentials and login
		</p>
		<form
			class="flex flex-col space-y-7 px-5 mt-10 w-full"
			method="post"
			on:submit|preventDefault={() => {
				emailSignIn();
			}}
		>
			<div class="input info solid">
				<div style="color: #E5E5E5;" class="select-none">Email</div>
				<div
					class="is-divider"
					style="background-color: #E5E5E5;"
				/>
				<input class="text-[#E5E5E5]" bind:value={email} />
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				/>
			</div>

			<div class="input info solid">
				<div style="color: #E5E5E5;" class="select-none">Password</div>
				<div
					class="is-divider"
					style="background-color: #E5E5E5;"
				/>
				<input
					type="password"
					style="color: #E5E5E5;"
					bind:value={password}
				/>
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				/>
			</div>
			<div class="flex justify-between items-center">
				<p class="text-red-600 text-sm">{errorText}</p>
				<button
					class="btn morningGreen solid ml-auto {loginProcessing
						? 'is-loading'
						: ''}">Login</button
				>
			</div>
		</form>
	</div>
</section>
