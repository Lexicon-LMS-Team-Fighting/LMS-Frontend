import { BASE_URL } from "../features/shared/constants";
import { ICoursePreview, IPaginatedResponse } from "../features/shared/types";
import { fetchWithToken } from "../features/shared/utilities";
import { catchFetchErrors } from "./fetchErrorsCatcher";

export async function fetchCourses(pageNumber: number = 1, pageSize: number = 10): Promise<IPaginatedResponse<ICoursePreview>> {
  try {
    const response = await fetchWithToken<IPaginatedResponse<ICoursePreview>>(`${BASE_URL}/course?page=${pageNumber}&pageSize=${pageSize}&include=progress`, {});

    const coursesWithDates = response.items.map((m) => ({
      ...m,
      startDate: new Date(m.startDate),
      endDate: new Date(m.endDate),
    }));

    return {
      ...response,
      items: coursesWithDates,
    };
  } catch (e) {
    catchFetchErrors(e, "courses", "all");
  }
}