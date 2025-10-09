import { BASE_URL } from "../features/shared/constants";
import { IModulePreview, IPaginatedResponse } from "../features/shared/types";
import { fetchWithToken } from "../features/shared/utilities/fetchWithToken";
import { catchFetchErrors } from "./fetchErrorsCatcher";

export async function fetchModulesByCourseId(
  guid: string,
  pageNumber: number = 1,
  pageSize: number = 10000
): Promise<IPaginatedResponse<IModulePreview>> {
  try {
    const response = await fetchWithToken<IPaginatedResponse<IModulePreview>>(
      `${BASE_URL}/course/${guid}/modules?page=${pageNumber}&pageSize=${pageSize}&include=progress`,
      {}
    );

    const modulesWithDates = response.items.map((m) => ({
      ...m,
      startDate: new Date(m.startDate),
      endDate: new Date(m.endDate),
    }));

    return {
      ...response,
      items: modulesWithDates,
    };
  } catch (e) {
    catchFetchErrors(e, "course", guid);
  }
}
