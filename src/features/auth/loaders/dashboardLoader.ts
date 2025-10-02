import { fetchCourseById } from "../../../fetchers/courseFetcher";
import { fetchUserExtendedById } from "../../../fetchers/userFetcher";
import { ICourse, IUser, IUserExtended } from "../../shared/types/types";
import { getCurrentUserId } from "../../shared/utilities/jwtDecoder";
import { getTokens } from "../utilities";

/**
 * Represents the shape of the loader result for a user's courses.
 */
export interface IDashboardDifferedLoader {
  userCourses: Promise<ICourse[] | null>;
}

/**
 * Loads the first course (with its modules) for the currently authenticated user.
 * - Verifies authentication by checking for a valid token.
 * - Retrieves the current user's ID from the JWT.
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
  const token = getTokens();

  if (!token) throw new Response("Unauthorized", { status: 401 }); // Todo: implement standardized exception/Response handling?.

  const userId = getCurrentUserId();

  if (!userId) throw new Response("Forbidden", { status: 403 }); // Todo: implement standardized exception/Response handling?.

  const user: IUserExtended = await fetchUserExtendedById(userId);

  if (user.courses.length === 0) return { userCourses: Promise.resolve(null) };

  const courses: Promise<ICourse[]> = Promise.all(
    user.courses.map(async (c) => {
      const courseData = await fetchCourseById(c.id);
      return {
        ...courseData,
        startDate: new Date(courseData.startDate),
        endDate: new Date(courseData.endDate),
      };
    })
  );

  return { userCourses: courses };
}
