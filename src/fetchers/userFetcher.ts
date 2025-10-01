import { CustomError } from "../features/shared/classes";
import { BASE_URL } from "../features/shared/constants";
import { IUser } from "../features/shared/types/types";
import { fetchWithToken } from "../features/shared/utilities";

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
export async function fetchUserById(guid: string): Promise<IUser> {
  if (!guid) throw new Response("User id missing", { status: 400 });

  try {
    return fetchWithToken<IUser>(`${BASE_URL}/user/${guid}`);
  } catch (e) {
    if (e instanceof CustomError && e.errorCode === 401)
      throw new Response("Unauthorized", { status: 401 }); // Todo: Better message is needed.

    if (e instanceof CustomError && e.errorCode === 403)
      throw new Response("Forbidden", { status: 403 }); // Todo: Better message is needed.

    if (e instanceof CustomError && e.errorCode === 404)
      throw new Response(`Could not find a user with id: ${guid}`, {
        status: 404,
      });

    const msg = e instanceof Error ? e.message : "Failed to load User";
    throw new Response(msg, { status: 502 });
  }
}
