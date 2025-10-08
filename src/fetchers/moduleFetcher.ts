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
export async function fetchFullModuleById(guid: string): Promise<IModuleFull> {
  if (!guid) throw new Response("module id missing", { status: 400 });

  try {
    const user = await fetchUserFromToken();

    const modules = await fetchWithToken<IModuleFull[]>(
      `${BASE_URL}/modules?include=progress`
    );

    // console.log(modules);
    // const module = await fetchWithToken<IModuleFull>(
    //   `${BASE_URL}/modules/${guid}?include=progress`
    // );

    // const activities = await fetchActivityByModuleId(
    //   "c0df3f9a-a639-43a5-ad58-294d70e3102d" /*m.id*/
    // );
    // console.log("hard", activities);

    const mappedModules = await Promise.all(
      modules.map(async (m) => {
        console.log("before", m.id);
        const activities = await fetchActivityByModuleId(m.id);
        console.log("soft", activities);
        return {
          ...m,
          startDate: new Date(m.startDate),
          endDate: new Date(m.endDate ?? ""),
          activities,
        };
      })
    );
    console.log("haeeloo", mappedModules);
    // const moduleActivities = await fetchActivityByModuleId(module.id);
    // console.log(moduleActivities);
    // `${BASE_URL}/modules/${guid}?include=activitiesparticipantsdocuments`;

    // const activities: IActivity[] = await Promise.all(
    //   moduleActivities!.map((a) => fetchActivityByUserId(a.id))
    // );

    // console.log(activities);
    return modules;
    // {
    //   ...modules,
    //   // activities,
    // };
  } catch (e) {
    catchFetchErrors(e, "module", guid);
  }
}

//TODO, This function only gets the first page of modules. Either fetch all or implement paging in ui
export async function fetchAllModules(): Promise<IModule[]> {
  const res = await fetchWithToken<PagedResponse<IModule> | IModule[]>(
    `${BASE_URL}/modules`,
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
