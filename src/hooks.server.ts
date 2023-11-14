import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/api'))
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
