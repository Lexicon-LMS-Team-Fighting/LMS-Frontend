import { IUser, IUserParticipants } from "../features/shared/types";
import { BASE_URL } from "../features/shared/constants";
import { fetchWithToken } from "../features/shared/utilities";
import { catchFetchErrors } from "./fetchErrorsCatcher";

interface IPagedResult<T> {
  items: T[];
  metadata: any;
}

/**
 * Fetches all participants for a given course.
 *
 * @param courseId - {string} guid - The unique course ID.
 * @returns - userId, användarnamn (userName),
 *              namn (firstName + lastName), email
 *
 * @throws {Response} 400 - If the course ID is missing.
 * @throws {Response} 401 - If the request is unauthorized.
 * @throws {Response} 403 - If access is forbidden.
 * @throws {Response} 404 - If no participants are found for the given course ID.
 * @throws {Response} 502 - If the request fails for another reason.
 */
export async function fetchParticipants(courseId: string): Promise<IUserParticipants[]> {
  if (!courseId) throw new Response("Course id missing", { status: 400 });
  try {
    const data: IPagedResult<IUser> = await fetchWithToken<IPagedResult<IUser>>(
      `${BASE_URL}/course/${courseId}/participants`
    );

    return data.items.map((user) => ({
      userId: user.id,
      användarnamn: user.userName,
      namn: `${user.firstName} ${user.lastName}`,
      email: user.email,
    }));
  } catch (e) {
    catchFetchErrors(e, "course", courseId);
  }
}
