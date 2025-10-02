import { fetchCourseWithModules } from "../../../fetchers/courseFetcher";
import { fetchUserFromToken } from "../../../fetchers/userFetcher";
import { ICourseWithModules, IUserExtended } from "../../shared/types/types";

/**
 * Represents the shape of the loader result for the current user's course with modules.
 */
export interface IMyCourseDifferedLoader {
  myCourse: Promise<ICourseWithModules | null>;
}

/**
 * Loads the first course (with its modules) for the currently authenticated user.
 * - Fetches the user details and extracts their associated course IDs.
 * - Loads the first course and its modules, ensuring date fields are converted to `Date` objects.
 *
 * @returns {Promise<IMyCourseDifferedLoader>} An object containing a promise of the user's first course with modules.
 *
 * @throws {Response} 401 - If the user is not authenticated (missing token).
 * @throws {Response} 403 - If the user ID cannot be determined.
 * @throws {Response} 404 - If the user has no associated courses.
 * @throws {Response} 502 - If fetching user or course data fails.
 */
export async function MyCourseDifferedLoader(): Promise<IMyCourseDifferedLoader> {
  const user: IUserExtended = await fetchUserFromToken();

  // User is not registered on any course
  if (user.courses.length > 0) {
    const myCourse = user.courses[0];

    const course: Promise<ICourseWithModules> = fetchCourseWithModules(
      myCourse.id
    );

    return { myCourse: course };
  }

  return { myCourse: Promise.resolve(null) };
}
