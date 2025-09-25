import { redirect, type LoaderFunctionArgs } from 'react-router';
import { validateOrRefreshTokens } from '../utilities';
import { TOKENS } from '../constants';
import { ITokens } from '../types';
import {jwtDecode} from 'jwt-decode';

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
    // This lets router.tsx get access to roles through requireAuthLoader
     try {
        const p = jwtDecode<{ role?: string | string[] }>(next.accessToken);
        const roles = Array.isArray(p.role) ? p.role : p.role ? [p.role] : [];
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
