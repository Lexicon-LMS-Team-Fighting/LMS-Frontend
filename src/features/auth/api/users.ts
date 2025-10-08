import { BASE_URL } from "../../shared/constants";
import { fetchWithToken } from "../../shared/utilities";
import { IUserCreate } from "../../shared/types";
import { IUser } from "../../shared/types";

export type CreateUserDto = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password?: string;
    role: "Student" | "Teacher";
    id?: string;
};

export type UpdateUserDto = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password?: string;
    role: "Student" | "Teacher";
    id?: string;
};

export async function createUser(user: CreateUserDto): Promise<IUserCreate> {
  return await fetchWithToken<IUserCreate>(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

export async function updateUser(id: string, user: UpdateUserDto): Promise<IUserCreate> {
  await fetchWithToken<void>(`${BASE_URL}/auth/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return await fetchWithToken<IUserCreate>(`${BASE_URL}/user/${id}`, {
    method: "GET",
  });
}

export async function fetchUsers(): Promise<IUser[]> {
  return await fetchWithToken<IUser[]>(`${BASE_URL}/user`, { method: "GET" });
}