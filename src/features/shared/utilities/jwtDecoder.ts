import { jwtDecode } from "jwt-decode";
import { getTokens } from "../../auth/utilities";

export function getCurrentUserId(): string | null {
  const token = getTokens();

  if (!token) return null;

  try {
    const claim: any = jwtDecode(token.accessToken);

    return (
      claim[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] ?? null
    );
  } catch {
    return null;
  }
}

export function getCurrentUserRole(): string | null {
  const token = getTokens();

  if (!token) return null;

  try {
    const claim: any = jwtDecode(token.accessToken);

    return (
      claim["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
      null
    );
  } catch {
    return null;
  }
}
