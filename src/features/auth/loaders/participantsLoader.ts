import { fetchParticipants } from "../../../fetchers/participantsFetcher";
import { fetchUserFromToken } from "../../../fetchers/userFetcher";
import { IUserExtended, IUserParticipants } from "../../shared/types";

/**
 * Loads the participants for the first course of the currently authenticated user.
 * - Fetches the authenticated user's details.
 * - Extracts their associated course IDs.
 * - Loads participants for the first available course.
 *
 * @returns {Promise<IUserParticipants[]>} A promise resolving to the participants list.
 *
 * @throws {Response} 401 - If the user is not authenticated (missing token).
 * @throws {Response} 403 - If the user ID cannot be determined.
 * @throws {Response} 404 - If the user has no associated courses.
 * @throws {Response} 502 - If fetching participants fails.
 */
export async function participantsLoader(): Promise<IUserParticipants[]> {
  const user: IUserExtended = await fetchUserFromToken();

  if (user.courses.length > 0) {
    return fetchParticipants(user.courses[0].id);
  }

  return [];
}
