import { CustomError } from '../classes';

export async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    throw new CustomError(res.status, res.statusText || 'Request failed');
  }
  
  //Fixed so it handles 204 and empty body. This shouldn't crash anything else
  if (res.status === 204) {
    return undefined as unknown as T;
  }
  const text = await res.text();
  if (!text) {
    return undefined as unknown as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new CustomError(res.status, 'Invalid JSON in response');
  }
}