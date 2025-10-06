import { fetchUserFromToken } from "../../../fetchers/userFetcher";
import { IUserExtended, IUserParticipants } from "../../shared/types";
export async function participantsLoader(): Promise<IUserParticipants[]> {
  const user: IUserExtended = await fetchUserFromToken();
  return [];
}
