import { BASE_URL } from "../features/shared/constants";
import { ICourse, ICourseWithModules } from "../features/shared/types/types";
import { fetchWithToken } from "../features/shared/utilities";
import { catchFetchErrors } from "./fetchErrorsCatcher";
import { fetchFullModuleById } from "./moduleFetcher";

/**
 * Fetches a course by its unique identifier.
 *
 * @param {string} guid - The unique course ID.
 * @returns {Promise<ICourse>} A promise resolving to the course object.
 *
 * @throws {Response} 400 - If the course ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no course is found with the given ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchCourseById(guid: string): Promise<ICourse> {
  if (!guid) throw new Response("Course id missing", { status: 400 });

  try {
    return await fetchWithToken<ICourse>(`${BASE_URL}/course/${guid}`);
  } catch (e) {
    catchFetchErrors(e, "course", guid);
  }
}

/**
 * Fetches a course along with its related modules (preview version).
 * Converts all date fields (course and modules) into Date objects.
 *
 * @param {string} guid - The unique course ID.
 * @returns {Promise<ICourseWithModules>} A promise resolving to the course with its modules.
 *
 * @throws {Response} 400 - If the course ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no course is found with the given ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchCourseWithModules(
  guid: string
): Promise<ICourseWithModules> {
  if (!guid) throw new Response("Course id missing", { status: 400 });

  try {
    const courseDate = await fetchWithToken<ICourseWithModules>(
      `${BASE_URL}/course/${guid}?include=modules`
    );

    return {
      ...courseDate,
      startDate: new Date(courseDate.startDate),
      endDate: new Date(courseDate.endDate),
      modules: courseDate.modules?.map((m) => ({
        ...m,
        startDate: new Date(m.startDate),
        endDate: m.endDate ? new Date(m.endDate) : undefined,
      })),
    };
  } catch (e) {
    catchFetchErrors(e, "course", guid);
  }
}

/**
 * Fetches a course along with its related modules (Full version).
 * Converts all date fields (course and modules) into Date objects.
 *
 * @param {string} guid - The unique course ID.
 * @returns {Promise<ICourseWithModules>} A promise resolving to the course with its modules.
 *
 * @throws {Response} 400 - If the course ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no course is found with the given ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchCourseWithFullModules(
  guid: string
): Promise<ICourseWithModules> {
  if (!guid) throw new Response("Course id missing", { status: 400 });

  try {
    const courseDate = await fetchWithToken<ICourseWithModules>(
      `${BASE_URL}/course/${guid}?include=modules`
    );

    const startDate = new Date(courseDate.startDate);
    const endDate = new Date(courseDate.endDate);

    const fullModules = await Promise.all(
      courseDate.modules!.map((m) => fetchFullModuleById(m.id))
    );

    return {
      ...courseDate,
      startDate,
      endDate,
      modules: fullModules,
    };
  } catch (e) {
    catchFetchErrors(e, "course", guid);
  }
}
