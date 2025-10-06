import { fetchParticipants } from "../../../fetchers/participantsFetcher";
import { fetchUserFromToken } from "../../../fetchers/userFetcher";
import { IUserExtended, IUserParticipants } from "../../shared/types";
export async function participantsLoader(): Promise<IUserParticipants[]> {
  const user: IUserExtended = await fetchUserFromToken();

  if (user.courses.length > 0) {
    return fetchParticipants(user.courses[0].id);
  }

  return [];
}
