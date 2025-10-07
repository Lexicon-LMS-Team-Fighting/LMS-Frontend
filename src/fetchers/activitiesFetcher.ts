import { BASE_URL } from "../features/shared/constants";
import { IUpcomingActivity, PagedResponse } from "../features/shared/types";
import { fetchWithToken } from "../features/shared/utilities/fetchWithToken";
import { catchFetchErrors } from "./fetchErrorsCatcher";

/**
 * Fetches all modules for a given course by its unique identifier.
 * Converts the `startDate` and `endDate` fields of each module into Date objects.
 *
 * @param {string} guid - The unique course ID.
 * @returns {Promise<IModule[]>} A promise resolving to an array of modules with date fields converted.
 *
 * @throws {Response} 400 - If the course ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no modules are found for the given course ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchUpcomingActivities(): Promise<IUpcomingActivity[]> 
{
  const now = new Date();
  let activities: IUpcomingActivity[] = [];
  try {
    const response = await fetchWithToken<PagedResponse<IUpcomingActivity[]>>(
      //We need to fetch all activities so we set a high pageSize.
      // This could be improved by implementing a specific date filter in the backend.
      `${BASE_URL}/lms-activities/?page=1&pageSize=1000000`
    );

    //Convert date strings to Date objects so we can sort them.
    activities = response.items.map((m) => ({
      ...m,
      startDate: new Date(m.startDate),
      endDate: m.endDate ? new Date(m.endDate) : undefined,
    }));

    //Sort activities by proximity to current date.
    const sortedByProximity = activities.sort(
      (a, b) => 
        Math.abs(a.startDate.getTime() - now.getTime()) - 
        Math.abs(b.startDate.getTime() - now.getTime())
    );

    //Slice will be done by component instead (If you want to increase/decreaste amount of activities that is shown).
    //Trim list to only inlude the today and future activities.
    return  sortedByProximity.filter(a => a.startDate >= now);

  } catch (e) {
    catchFetchErrors(e, "activities", "all");
    return [];
  }
}
