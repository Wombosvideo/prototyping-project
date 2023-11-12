import { writable } from "svelte/store";

export default writable<App.DTUser | null>(null);
