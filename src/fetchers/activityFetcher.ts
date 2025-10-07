import { BASE_URL } from "../features/shared/constants";
import { IActivity } from "../features/shared/types";
import { fetchWithToken } from "../features/shared/utilities/fetchWithToken";
import { catchFetchErrors } from "./fetchErrorsCatcher";

/**
 * Fetches a single "activity" by its unique identifier.
 * Converts the `startDate` and `endDate` fields of each module into Date objects.
 *
 * @param {string} guid - The unique activity ID.
 * @returns {Promise<IActivity>} A promise resolving to a activity with date fields converted.
 *
 * @throws {Response} 400 - If the activity ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no activity are found for the given activity ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchActivityById(guid: string): Promise<IActivity> {
  if (!guid) throw new Response("Activity id missing", { status: 400 });

  try {
    let response = await fetchWithToken<IActivity>(
      `${BASE_URL}/lms-activities/${guid}?include=feedbacks`
    );

    const startDate = new Date(response.startDate);
    const endDate = response.endDate ? new Date(response.endDate) : undefined;

    return (response = {
      ...response,
      startDate,
      endDate,
    });
  } catch (e) {
    catchFetchErrors(e, "course", guid);
  }
}
