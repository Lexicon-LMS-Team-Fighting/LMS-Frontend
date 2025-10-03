import { BASE_URL } from "../features/shared/constants";
import { IModule, PagedResponse } from "../features/shared/types";
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
export async function fetchModulesForCourseById(
  guid: string
): Promise<IModule[]> {
  if (!guid) throw new Response("Course id missing", { status: 400 });

  try {
    const response = await fetchWithToken<PagedResponse<IModule[]>>(
      `${BASE_URL}/course/${guid}/modules`
    );

    return response.items.map((m) => ({
      ...m,
      startDate: new Date(m.startDate),
      endDate: m.endDate ? new Date(m.endDate) : undefined,
    }));
  } catch (e) {
    catchFetchErrors(e, "course", guid);
  }
}
