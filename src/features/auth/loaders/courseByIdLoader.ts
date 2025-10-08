import type { LoaderFunctionArgs } from "react-router";
import { getCourseById, getCourseModules } from "../api/course";

export async function courseByIdLoader({ params }: LoaderFunctionArgs) {
  const id = params.id!;
  const courseById = await getCourseById(id);
  const courseModules = await getCourseModules(id)
  return { courseById, courseModules}
}
