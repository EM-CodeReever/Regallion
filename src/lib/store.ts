import { writable } from 'svelte/store';
import type { Profile } from '@prisma/client';


const count = writable(0);

const userProfileStore = writable({} as Profile)


userProfileStore.subscribe((value) => {
	console.log("userProfileStore", value);
}); // logs '0'

