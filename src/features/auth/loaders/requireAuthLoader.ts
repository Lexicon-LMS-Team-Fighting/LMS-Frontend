import { redirect, type LoaderFunctionArgs } from 'react-router';
import { validateOrRefreshTokens } from '../utilities';
import { TOKENS } from '../constants';
import { ITokens } from '../types';
import {jwtDecode} from 'jwt-decode';
const FAKE = import.meta.env.VITE_FAKE_AUTH === '1';

export async function requireAuthLoader({ request }: LoaderFunctionArgs) {
  const raw = localStorage.getItem(TOKENS);
  const tokens = raw ? (JSON.parse(raw) as ITokens) : null;

  const next = await validateOrRefreshTokens(tokens);
  if (next) {
    // Update localStorage if refresh gave new tokens
    const nextRaw = JSON.stringify(next);
    if (nextRaw !== raw) {
      localStorage.setItem(TOKENS, nextRaw);
    }
    
    // This lets router.ts get access to roles through requireAuthLoader
   try {

    // Changing object key to target based on if it's mock login or not
      const key = !FAKE ? 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' : "role"
      const decodedToken = jwtDecode<Record<string, unknown>>(next.accessToken);

      const roleKey = decodedToken[key];
      let roles: string[] = [];

      if (Array.isArray(roleKey)) {
        roles = roleKey.map(String);
      } else if (typeof roleKey === 'string') {
        roles = roleKey.split(',').map(s => s.trim()).filter(Boolean);
      }

        return { roles };
    } catch {
        return { roles: [] };
    }
  }

  const url = new URL(request.url);
  const redirectTo = encodeURIComponent(url.pathname + url.search);

  console.log('Redirecting unauthenticated user => /login');
  throw redirect(`/login?redirectTo=${redirectTo}`);


}
