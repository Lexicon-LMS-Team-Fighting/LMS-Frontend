import { fetchCourseWithModules } from "../../../fetchers/courseFetcher";
import { fetchUserById } from "../../../fetchers/userFetcher";
import { ICourseWithModules, IUser } from "../../shared/types/types";
import { getCurrentUserId } from "../../shared/utilities/jwtDecoder";
import { getTokens } from "../utilities/tokens";

/**
 * Represents the shape of the loader result for the current user's course with modules.
 */
export interface IMyCourseDifferedLoader {
  myCourse: Promise<ICourseWithModules>;
}

/**
 * Loads the first course (with its modules) for the currently authenticated user.
 * - Verifies authentication by checking for a valid token.
 * - Retrieves the current user's ID from the JWT.
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
  const token = getTokens();

  if (!token) throw new Response("Unauthorized", { status: 401 }); // Todo: implement standardized exception/Response handling?.

  const userId = getCurrentUserId();

  if (!userId) throw new Response("Forbidden", { status: 403 }); // Todo: implement standardized exception/Response handling?.

  const user: IUser = await fetchUserById(userId);
  const courseId = user.courseIds[0];
  const course: ICourseWithModules = await fetchCourseWithModules(courseId);

  return { myCourse: Promise.resolve(course) };
}
