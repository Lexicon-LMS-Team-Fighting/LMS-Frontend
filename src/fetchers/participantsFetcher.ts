import { IUser, IUserParticipants } from "../features/shared/types";
import { BASE_URL } from "../features/shared/constants";
import { fetchWithToken } from "../features/shared/utilities";

interface IPagedResult<T> {
  items: T[];
  metadata: any;
}
export async function fetchParticipants(courseId: string): Promise<IUserParticipants[]> {
  const data: IPagedResult<IUser> = await fetchWithToken<IPagedResult<IUser>>(
    `${BASE_URL}/course/${courseId}/participants`
  );
}
