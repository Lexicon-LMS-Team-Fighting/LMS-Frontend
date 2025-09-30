import { fetchCourseById } from "../../../fetchers/courseFetcher";
import { fetchUserById } from "../../../fetchers/userFetcher";
import { ICourse, IUser } from "../../shared/types/types";
import { getCurrentUserId } from "../../shared/utilities/jwtDecoder";
import { getTokens } from "../utilities";

export interface ICourseDifferedLoaderReturn {
  userCourses: Promise<ICourse[]>;
}

export async function DashboardDifferedLoader(): Promise<ICourseDifferedLoaderReturn> {
  const token = getTokens();

  if (!token) throw new Response("Unauthorized", { status: 401 }); // Todo: implement standardized exception/Response handling?.

  const userId = getCurrentUserId();

  if (!userId) throw new Response("Forbidden", { status: 403 }); // Todo: implement standardized exception/Response handling?.

  const user: IUser = await fetchUserById(userId);

  console.log(`print 1:`, user);
  const courses: ICourse[] = await Promise.all(
    user.courseIds.map((cId) => fetchCourseById(cId))
  );

  // const courses: ICourse[] = await Promise.all(
  //   user.courseIds.map(async (cId) => {
  //     const courseData = await fetchCourseById(cId);
  //     console.log(`print loop: ${courseData}`);

  //     return {
  //       ...courseData,
  //       startDate: new Date(courseData.startDate),
  //       endDate: new Date(courseData.endDate),
  //     };
  //   })
  // );
  console.log(`print 2:`, courses);

  return { userCourses: Promise.resolve(courses) };
}
