import { BASE_URL } from "../features/shared/constants";
import { IActivity, IFeedbacks, PagedResponse } from "../features/shared/types";
import { fetchWithToken } from "../features/shared/utilities/fetchWithToken";
import { catchFetchErrors } from "./fetchErrorsCatcher";
import { fetchUserFromToken } from "./userFetcher";

/**
 * Fetches all activities associated with a specific module.
 *
 * Each activity returned will have its `startDate` and `endDate` converted to `Date` objects,
 * and will include the current user's feedback (if available).
 *
 * @param {string} moduleId - The unique ID of the module whose activities should be fetched.
 * @returns {Promise<IActivity[]>} A promise resolving to an array of activities,
 * each containing converted date fields and a `feedbacks` object.
 *
 * @throws {Response} 400 - If the module ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no activities are found for the given module ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchActivityByModuleId(
  moduleId: string
): Promise<IActivity[]> {
  if (!moduleId) throw new Response("Module id missing", { status: 400 });

  try {
    const response = (
      await fetchWithToken<PagedResponse<IActivity[]>>(
        `${BASE_URL}/modules/${moduleId}/activities`
      )
    ).items;

    const activities = await Promise.all(
      response.map(async (a) => ({
        ...a,
        startDate: new Date(a.startDate),
        endDate: a.endDate ? new Date(a.endDate) : undefined,
        feedbacks: await fetchFeedbacksForActivity(a.id),
      }))
    );

    return activities;
  } catch (e) {
    catchFetchErrors(e, "course", moduleId);
  }
}

/**
 * Fetches feedback information for a specific activity for the currently authenticated user.
 *
 * The feedback includes the user's ID, the activity ID, the written feedback text (if any),
 * and the submission status (e.g., "Försenad").
 *
 * @param {string} activityId - The unique ID of the activity for which feedback should be fetched.
 * @returns {Promise<IFeedbacks>} A promise resolving to the user's feedback object for the specified activity.
 *
 * @throws {Response} 400 - If the activity ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If feedback could not be found for the given activity ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchFeedbacksForActivity(
  activityId: string
): Promise<IFeedbacks> {
  if (!activityId) throw new Response("Activity id missing", { status: 400 });

  const user = await fetchUserFromToken();

  try {
    return await fetchWithToken<IFeedbacks>(
      `${BASE_URL}/lms-activities/activities/${activityId}/participants/${user.id}/feedback`
    );
  } catch (e) {
    catchFetchErrors(e, "course", activityId);
  }
}
