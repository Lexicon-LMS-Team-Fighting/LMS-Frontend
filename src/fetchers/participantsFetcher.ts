import { IUser, IUserParticipants } from "../features/shared/types";
import { BASE_URL } from "../features/shared/constants";
import { fetchWithToken } from "../features/shared/utilities";

interface IPagedResult<T> {
  items: T[];
  metadata: any;
}

export async function fetchParticipants(courseId: string): Promise<IUserParticipants[]> {
  if (!courseId) throw new Response("Course id missing", { status: 400 });

  const data: IPagedResult<IUser> = await fetchWithToken<IPagedResult<IUser>>(
    `${BASE_URL}/course/${courseId}/participants`
  );

  return data.items.map((user) => ({
    userId: user.id,
    användarnamn: user.userName,
    namn: `${user.firstName} ${user.lastName}`,
    email: user.email,
  }));
}
