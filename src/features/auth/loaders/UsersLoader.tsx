import { fetchUsers } from "../api/users";
import type { IUser } from "../../shared/types/types";


export interface IUserDeferredLoader {
  users: Promise<IUser[]>;
}

export async function usersDeferredLoader(): Promise<IUserDeferredLoader> {
    
  const users: Promise<IUser[]> = fetchUsers()

  return { users }
}
