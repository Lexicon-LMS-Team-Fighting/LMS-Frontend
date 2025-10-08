import { BASE_URL } from "../features/shared/constants";
import { IActivity, IFeedbacks } from "../features/shared/types";
import { fetchWithToken } from "../features/shared/utilities/fetchWithToken";
import { catchFetchErrors } from "./fetchErrorsCatcher";

/**
 * Fetches all "activities" associated with a module.
 * Converts the `startDate` and `endDate` fields of each module into Date objects.
 *
 * @param {string} moduleId - The unique activity ID.
 * @returns {Promise<IActivity[]>} A promise resolving to an array of activities with date fields converted.
 *
 * @throws {Response} 400 - If the Module ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no modules are found for the given module ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchActivityByModuleId(
  moduleId: string
): Promise<IActivity[]> {
  console.log("3");

  if (!moduleId) throw new Response("Module id missing", { status: 400 });
  console.log("4");

  try {
    const response = await fetchWithToken<IActivity[]>(
      `${BASE_URL}/modules/${moduleId}?include=activities`
    );

    console.log("5");
    console.log(response);
    return response.map((a) => ({
      ...a,
      startDate: new Date(a.startDate),
      endDate: a.endDate ? new Date(a.endDate) : undefined,
    }));
  } catch (e) {
    catchFetchErrors(e, "course", moduleId);
  }
}

export async function fetchFeedbackForActivityByUserId(
  activityId: string,
  userId: string
): Promise<IFeedbacks> {
  if (!activityId) throw new Response("Activity id missing", { status: 400 });
  if (!activityId) throw new Response("User id missing", { status: 400 });

  try {
    return await fetchWithToken<IFeedbacks>(
      `${BASE_URL}/lms-activities/activities/${activityId}/participants/${userId}/feedback`
    );
  } catch (e) {
    catchFetchErrors(e, "course", activityId);
  }
}
