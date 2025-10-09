import { BASE_URL } from "../features/shared/constants";
import {
  IActivity,
  IModule,
  IModuleFull,
  PagedResponse,
} from "../features/shared/types";
import { fetchWithToken } from "../features/shared/utilities/fetchWithToken";
import { fetchActivityByModuleId } from "./activityFetcher";
import { catchFetchErrors } from "./fetchErrorsCatcher";
import { fetchUserFromToken } from "./userFetcher";

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
export async function fetchModulesForCourseById(guid: string): Promise<IModule[]> {
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

/**
 * Fetches a Single module, with all its data, by its unique identifier.
 * Converts the `startDate` and `endDate` fields of each module and activity into Date objects.
 *
 * @param {string} guid - The unique module ID.
 * @returns {Promise<IModule>} A promise resolving to a module with date fields converted.
 *
 * @throws {Response} 400 - If the module ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no modules are found for the given course ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchFullModuleById(
  guid: string
): Promise<IModuleFull[]> {
  if (!guid) throw new Response("module id missing", { status: 400 });

  try {
    const modules = (
      await fetchWithToken<PagedResponse<IModuleFull[]>>(
        `${BASE_URL}/modules?include=progress`
      )
    ).items;

    const mappedModules = await Promise.all(
      modules.map(async (m) => {
        const activities = await fetchActivityByModuleId(m.id);
        return {
          ...m,
          startDate: new Date(m.startDate),
          endDate: new Date(m.endDate ?? ""),
          activities,
        };
      })
    );

    return mappedModules;
  } catch (e) {
    catchFetchErrors(e, "module", guid);
  }
}

/**
 * Fetches all modules associated with a specific course.
 * Converts `startDate` and `endDate` fields of each module into Date objects.
 *
 * @param {string} courseId - The unique ID of the course.
 * @returns {Promise<IModule[]>} A promise resolving to an array of modules with converted date fields.
 *
 * @throws {Response} 400 - If the course ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no modules are found for the given course ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchModulesByCourseId(
  courseId: string
): Promise<IModuleFull[]> {
  const modules = (
    await fetchWithToken<PagedResponse<IModuleFull[]>>(
      `${BASE_URL}/course/${courseId}/modules?include=progress`
    )
  ).items;

  return modules.map((m) => ({
    ...m,
    startDate: new Date(m.startDate),
    endDate: m.endDate ? new Date(m.endDate) : undefined,
  }));
}

//TODO, This function only gets the first page of modules. Either fetch all or implement paging in ui
export async function fetchAllModules(): Promise<IModule[]> {
  const res = await fetchWithToken<PagedResponse<IModule> | IModule[]>(
    `${BASE_URL}/modules?PageSize=10000`,
    { method: "GET" }
  );

  const items = Array.isArray(res) ? res : res.items;

  if (!Array.isArray(items)) {
    throw new Error("Expected modules array from /modules endpoint");
  }

  return items.map((m) => ({
    ...m,
    startDate: new Date(m.startDate),
    endDate: m.endDate ? new Date(m.endDate) : undefined,
  }));
}
