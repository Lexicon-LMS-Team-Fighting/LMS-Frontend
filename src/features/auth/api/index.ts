import { CustomError } from '../../shared/classes';
import { BASE_URL } from '../../shared/constants';
import { ITokens } from '../types';
import { makeFakeTokens } from '../utilities/fakeJwt';
const FAKE = import.meta.env.VITE_FAKE_AUTH === '1';

export async function loginReq(username: string, password: string): Promise<ITokens> {
  const url = `${BASE_URL}/auth/login`;
  

  // Remove this if-statement when backend works
   if (FAKE) {
    const roles = /teach/i.test(username) ? ["Teacher"] : ["Student"];
    return makeFakeTokens(username, roles);
  }
//_________________________________________

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok === false) {
    throw new CustomError(response.status, 'Could not login');
  }

  return (await response.json()) as ITokens;
}

export async function refreshTokens(accessToken: string, refreshToken: string): Promise<ITokens> {
  //Remove this if-statement when backend works
   if (FAKE) {

    try {
      const [, body] = accessToken.split(".");
      const json = decodeURIComponent(atob(body.replace(/-/g, "+").replace(/_/g, "/")));
      const p = JSON.parse(json); // { email, role }
      const roles = Array.isArray(p.role) ? p.role : [p.role].filter(Boolean);
      return makeFakeTokens(p.email || "demo@example.com", roles.length ? roles : ["Student"]);
    } catch {
      return makeFakeTokens("demo@example.com", ["Student"]);
    }
  }
  //_______________________________________________________________________________________
  const url: string = `${BASE_URL}/token/refresh`;

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  });

  if (response.ok === false) {
    throw new CustomError(response.status, 'Something went wrong with refresh token');
  }

  return (await response.json()) as ITokens;
}
