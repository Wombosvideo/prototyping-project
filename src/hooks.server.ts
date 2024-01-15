import { connect } from '$lib/server/mongodb';
import { error, type Handle } from '@sveltejs/kit';

try {
  await connect();
} catch (err) {
  throw error(500, 'Failed to connect to MongoDB');
}

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/api/users'))
    return await resolve(event);

  const { cookies, locals, fetch } = event;
  const userIdCookie = cookies.get('userId');

  if (!userIdCookie)
    return await resolve(event);

  const res = await fetch(`/api/users/${userIdCookie}`);
  const data = await res.json();
  
  if (data.status !== 'success')
    throw error(500, 'Failed to fetch user');

  locals.user = data.user;

	const response = await resolve(event);
	return response;
};
