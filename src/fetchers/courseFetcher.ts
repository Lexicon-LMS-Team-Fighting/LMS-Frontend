import { CustomError } from "../features/shared/classes";
import { BASE_URL } from "../features/shared/constants";
import { ICourse } from "../features/shared/types/types";
import { fetchWithToken } from "../features/shared/utilities";

export async function fetchCourseById(guid: string): Promise<ICourse> {
  if (!guid) throw new Response("Course id missing", { status: 400 });

  try {
    return await fetchWithToken<ICourse>(`${BASE_URL}/course/${guid}`);
  } catch (e) {
    if (e instanceof CustomError && e.errorCode === 401)
      throw new Response("Unauthorized", { status: 401 }); // Todo: Better message is needed.

    if (e instanceof CustomError && e.errorCode === 403)
      throw new Response("Forbidden", { status: 403 }); // Todo: Better message is needed.

    if (e instanceof CustomError && e.errorCode === 404)
      throw new Response(`Could not find a course with id: ${guid}`, {
        status: 404,
      });

    const msg = e instanceof Error ? e.message : "Failed to load course";
    throw new Response(msg, { status: 502 });
  }
}
