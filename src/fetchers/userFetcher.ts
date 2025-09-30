import { CustomError } from "../features/shared/classes";
import { BASE_URL } from "../features/shared/constants";
import { IUser } from "../features/shared/types/types";
import { fetchWithToken } from "../features/shared/utilities";

export async function fetchUserById(guid: string): Promise<IUser> {
  if (!guid) throw new Response("User id missing", { status: 400 });

  try {
    return fetchWithToken<IUser>(`${BASE_URL}/user/${guid}`);
  } catch (e) {
    if (e instanceof CustomError && e.errorCode === 401)
      throw new Response("Unauthorized", { status: 401 }); // Todo: Better message is needed.

    if (e instanceof CustomError && e.errorCode === 403)
      throw new Response("Forbidden", { status: 403 }); // Todo: Better message is needed.

    if (e instanceof CustomError && e.errorCode === 404)
      throw new Response(`Could not find a user with id: ${guid}`, {
        status: 404,
      });

    const msg = e instanceof Error ? e.message : "Failed to load User";
    throw new Response(msg, { status: 502 });
  }
}
