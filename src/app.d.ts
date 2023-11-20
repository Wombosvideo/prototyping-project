// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: DTUser;
		}
		// interface PageData {}
		// interface Platform {}
		type DTUserRole = "manager" | "guest";
		type DTUser = {
			id: string;
			displayName: string;
			firstName: string;
			lastName: string;
			email: string;
			role: DTUserRole;
		};
		type DTEvent = {
			id: string;
			name: string;
			description: string;
			startDateTime: string;
			endDateTime: string;
			price: number;
			maxParticipants: number;
			venueId: string;
			banner: string;
		};
		type DTCategory = {
			id: string;
			name: string;
			icon: string;
		};
		type DTVenue = {
			id: string;
			name: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			country: string;
			banner: string;
		};
	}
}

export {};
