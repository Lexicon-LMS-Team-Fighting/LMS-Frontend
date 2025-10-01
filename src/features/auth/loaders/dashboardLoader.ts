import { fetchCourseById } from "../../../fetchers/courseFetcher";
import { fetchUserById } from "../../../fetchers/userFetcher";
import { ICourse, IUser } from "../../shared/types/types";
import { getCurrentUserId } from "../../shared/utilities/jwtDecoder";
import { getTokens } from "../utilities";

/**
 * Represents the shape of the loader result for a user's courses.
 */
export interface IDashboardDifferedLoader {
  userCourses: Promise<ICourse[]>;
}

/**
 * Loads all courses for the currently authenticated user.
 * - Validates authentication and authorization using stored tokens and user ID.
 * - Fetches the user's details and retrieves their associated courses.
 * - Ensures `startDate` and `endDate` fields in courses are converted to `Date` objects.
 *
 * @returns {Promise<IDashboardDifferedLoader>} An object containing a promise of the user's courses.
 *
 * @throws {Response} 401 - If the user is not authenticated (missing token).
 * @throws {Response} 403 - If the user ID cannot be determined.
 * @throws {Response} 502 - If fetching the user or course data fails.
 */
export async function CourseForUserDifferedLoader(): Promise<IDashboardDifferedLoader> {
  const token = getTokens();

  if (!token) throw new Response("Unauthorized", { status: 401 }); // Todo: implement standardized exception/Response handling?.

  const userId = getCurrentUserId();

  if (!userId) throw new Response("Forbidden", { status: 403 }); // Todo: implement standardized exception/Response handling?.

  const user: IUser = await fetchUserById(userId);

  const courses: Promise<ICourse[]> = Promise.all(
    user.courseIds.map(async (cId) => {
      const courseData = await fetchCourseById(cId);
      return {
        ...courseData,
        startDate: new Date(courseData.startDate),
        endDate: new Date(courseData.endDate),
      };
    })
  );

  return { userCourses: courses };
}
