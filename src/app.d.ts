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
			_id: string;
			displayName: string;
			firstName: string;
			lastName: string;
			email: string;
			role: DTUserRole;
		};
		type DTEvent = {
			_id: string;
			name: string;
			description: string;
			startDateTime: string;
			endDateTime: string;
			price: number;
			maxParticipants: number;
			venue: string;
			banner: string;
			managers: string[];
			categories: string[];
			participants: string[];
		};
		type DTCategory = {
			_id: string;
			name: string;
			icon: string;
		};
		type DTVenue = {
			_id: string;
			name: string;
			address: string;
			city: string;
			zip: string;
			country: string;
			photo: string;
			eventCount: number;
			upcomingEventCount: number;
		};
	}
}

export {};
