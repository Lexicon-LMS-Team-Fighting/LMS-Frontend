import { jwtDecode, JwtPayload } from "jwt-decode";
import { getTokens } from "../../auth/utilities";

interface AppJwtClaims {
  name: string;
  guid: string;
  role: string;
  expiration: number;
  // FirstName: string;
  // LastName: string;
}

export function getCurrentUserClaims(): AppJwtClaims | null {
  const token = getTokens();

  if (!token) return null;

  try {
    return jwtDecode<AppJwtClaims>(token.accessToken);
  } catch {
    return null;
  }
}

export function getCurrentUserId(): string | null {
  const claim = getCurrentUserClaims();

  /*["guid"]*/
  return claim?.guid ?? null;
}
