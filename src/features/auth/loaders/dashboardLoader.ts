import { fetchAllCourses, fetchCourseById } from "../../../fetchers/courseFetcher";
import { fetchAllModules } from "../../../fetchers/moduleFetcher";
import { ICourse, ICourseWithCounts, IModule } from "../../shared/types/types";

{/*TODO: find a way to get the course a student is attending to calcuate how many students participates in a course*/}
//import { fetchUsers } from "../api/users";


/**
 * Represents the shape of the loader result for a user's courses.
 */

export interface IDashboardDifferedLoader {
  userCourses: Promise<ICourseWithCounts[] | null>;
  modules: Promise<IModule[]>;
}

async function fetchAllCoursesAllPages(): Promise<ICourse[]> {
  let page = 1;
  const all: ICourse[] = [];
  while (true) {
    const res: any = await fetchAllCourses(page);
    const items: ICourse[] = res?.items ?? [];
    all.push(...items);
    if (!res?.metadata?.hasNextPage) break;
    page += 1;
  }
  return all;
}


/**
 * Loads the first course (with its modules) for the currently authenticated user.
 * - Fetches the user details and extracts their associated course IDs.
 * - Loads the first course and its modules, ensuring date fields are converted to `Date` objects.
 * - Returns `Promise<null>` if the user has no linked courses.
 *
 * @returns {Promise<IDashboardDifferedLoader>} An object containing a promise of the user's first course with modules, or `null` if none exist.
 *
 * @throws {Response} 401 - If the user is not authenticated (missing token).
 * @throws {Response} 403 - If the user ID cannot be determined.
 * @throws {Response} 502 - If fetching user or course data fails.
 */
export async function DashboardDifferedLoader(): Promise<IDashboardDifferedLoader> {

  const modulesP: Promise<IModule[]> = fetchAllModules().then(list =>
    list.map<IModule>(m => ({
      ...m,
      startDate: new Date(m.startDate),
      endDate: m.endDate ? new Date(m.endDate) : new Date(""),
    }))
  );

  const coursesP: Promise<ICourse[]> = fetchAllCoursesAllPages().then(list =>
    list.map<ICourse>(c => ({
      ...c,
      startDate: new Date(c.startDate),
      endDate: c.endDate ? new Date(c.endDate) : new Date(""),
    }))
  );

  // check how many modules a course includes and how many students are in it
  const userCourses: Promise<ICourseWithCounts[] | null> = Promise.all([modulesP, coursesP]).then(
    ([mods, courses]) => {
      if (!courses?.length) return null;
      const counts = mods.reduce<Record<string, number>>((acc, m /*: ModWithCourse*/) => {
        const cid = (m as any).courseId as string | undefined; // <-- byt till m.courseId när typen är uppdaterad
        if (!cid) return acc;
        acc[cid] = (acc[cid] ?? 0) + 1;
        return acc;
      }, {});

      return courses.map<ICourseWithCounts>(c => ({
        ...c,
        moduleCount: counts[c.id] ?? 0,
        studentCount: 0, // maybe implements this if we have time
      }));
    }
  );

  return { userCourses, modules: modulesP };
}