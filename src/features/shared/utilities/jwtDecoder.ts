import { jwtDecode } from "jwt-decode";
import { getTokens } from "../../auth/utilities";

/**
 * Extracts the current user's ID from the access token.
 * - Retrieves the stored tokens.
 * - Decodes the access token using `jwt-decode`.
 * - Reads the `nameidentifier` claim from the token.
 *
 * @returns {string | null} The user ID if available, otherwise `null`.
 */
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

/**
 * Extracts the current user's role from the access token.
 * - Retrieves the stored tokens.
 * - Decodes the access token using `jwt-decode`.
 * - Reads the `role` claim from the token.
 *
 * @returns {string | null} The user role if available, otherwise `null`.
 */
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
