import { fetchCourses } from "../../../fetchers/coursesFetcher";
import { ICoursePreview, IPaginatedResponse } from "../../shared/types/types";

export interface ITeacherCoursesDifferedLoader {
  courses: Promise<IPaginatedResponse<ICoursePreview>>;
}

export async function TeacherCoursesDifferedLoader(): Promise<ITeacherCoursesDifferedLoader> {
  return { courses: fetchCourses(1, 3) };
}
