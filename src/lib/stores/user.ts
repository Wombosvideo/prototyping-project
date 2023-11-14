import { writable, derived } from "svelte/store";

export const users = writable<App.DTUser[]>([
  {
    id: "1",
    displayName: "Alice Visconti",
    email: "alice.visconti@example.com",
    firstName: "Alice",
    lastName: "Doe",
    role: "manager"
  },
  {
    id: "2",
    displayName: "Bob Ross",
    email: "bob.ross@example.com",
    firstName: "Bob",
    lastName: "Ross",
    role: "guest"
  }
]);
export const userId = writable<string | null>(null);
export const user = derived([users, userId], ([$users, $userId]) => {
  return $users.find((user) => user.id === $userId) ?? null;
});
