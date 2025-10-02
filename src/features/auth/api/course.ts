import { BASE_URL } from "../../shared/constants";
import { fetchWithToken } from "../../shared/utilities";
import { ICourse } from "../../shared/types";

export type CreateCourseDto = {
  name: string;
  description?: string;
  startDate: string; 
  endDate: string;  
};

export type UpdateCourseDto = {
  name: string;
  description?: string;
  startDate: string; 
  endDate: string;  
};

export async function createCourse(course: CreateCourseDto): Promise<ICourse> {
  return await fetchWithToken<ICourse>(`${BASE_URL}/course`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}

export async function updateCourse(id: string, course: UpdateCourseDto): Promise<ICourse> {
  await fetchWithToken<void>(`${BASE_URL}/course/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });

  return await fetchWithToken<ICourse>(`${BASE_URL}/course/${id}`, {
    method: "GET",
  });
}