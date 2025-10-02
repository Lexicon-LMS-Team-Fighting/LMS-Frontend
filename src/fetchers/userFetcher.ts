import { BASE_URL } from "../features/shared/constants";
import { IUser, IUserExtended } from "../features/shared/types/types";
import { fetchWithToken } from "../features/shared/utilities";
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

// /**
//  * Fetches a user by their unique identifier.
//  *
//  * @param {string} guid - The unique user ID.
//  * @returns {Promise<IUser>} A promise resolving to the user object.
//  *
//  * @throws {Response} 400 - If the user ID is missing.
//  * @throws {Response} 401 - If the request is unauthorized.
//  * @throws {Response} 403 - If access is forbidden.
//  * @throws {Response} 404 - If no user is found with the given ID.
//  * @throws {Response} 502 - If the request fails for another reason.
//  */
// export async function fetchUserById(guid: string): Promise<IUser> {
//   if (!guid) throw new Response("User id missing", { status: 400 });

//   try {
//     return await fetchWithToken<IUser>(`${BASE_URL}/user/${guid}`);
//   } catch (e) {
//     catchFetchErrors(e, "user", guid);
//   }
// }
