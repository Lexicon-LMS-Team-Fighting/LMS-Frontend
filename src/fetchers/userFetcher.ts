import { ITokens } from "../features/auth/types";
import { getTokens } from "../features/auth/utilities";
import { BASE_URL } from "../features/shared/constants";
import { IUserExtended } from "../features/shared/types/types";
import { fetchWithToken } from "../features/shared/utilities";
import { getCurrentUserId } from "../features/shared/utilities/jwtDecoder";
import { catchFetchErrors } from "./fetchErrorsCatcher";

/**
 * Fetches a user by their unique identifier.
 *
 * @param {string} guid - The unique user ID.
 * @returns {Promise<IUser>} A promise resolving to the user object.
 *
 * @throws {Response} 400 - If the user ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no user is found with the given ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchUserExtendedById(
  guid: string
): Promise<IUserExtended> {
  if (!guid) throw new Response("User id missing", { status: 400 });

  try {
    return await fetchWithToken<IUserExtended>(`${BASE_URL}/user/${guid}`);
  } catch (e) {
    catchFetchErrors(e, "user", guid);
  }
}

export async function fetchUserFromToken(): Promise<IUserExtended> {
  const token = getTokens();

  if (!token) throw new Response("Unauthorized", { status: 401 }); // Todo: implement standardized exception/Response handling?.

  const userId = getCurrentUserId();

  if (!userId) throw new Response("Forbidden", { status: 403 }); // Todo: implement standardized exception/Response handling?.

  try {
    return await fetchUserExtendedById(userId);
  } catch (e) {
    catchFetchErrors(e, "user", userId);
  }
}
