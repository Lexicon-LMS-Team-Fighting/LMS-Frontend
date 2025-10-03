import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import { ICoursePreview, IPaginatedResponse } from "../../features/shared/types";
import { ITeacherCoursesDifferedLoader } from "../../features/auth/loaders/coursesLoader";
import { usePaginatedLoader } from "../../features/shared/hooks/usePaginatedLoader";
import { fetchCourses } from "../../fetchers/coursesFetcher";
import { CourseItem } from "./TeacherCourseItem";
import { Spinner } from "../../features/shared/components/Spinner";
import { AwaitError } from "../../features/shared/components/AwaitError";
import "./TeacherCourses.css";

export const TeacherCourses = () => {
  const { courses: initialCoursesPromise } = useLoaderData<ITeacherCoursesDifferedLoader>();

  return (
    <Suspense fallback={<div className="text-center"><Spinner /></div>}>
      <Await resolve={initialCoursesPromise} errorElement={<AwaitError />}>
        {(initialCourses: IPaginatedResponse<ICoursePreview>) => {
          const {
            items: courses,
            loadMore: loadMoreCourses,
            hasNext: coursesHasNext,
            loading: coursesLoading,
            error: coursesError,
          } = usePaginatedLoader<ICoursePreview>({
            initialData: initialCourses,
            fetchPage: (page) => fetchCourses(page, 3),
          });

          return (
          <>
            {coursesError && (
              <div className="alert alert-danger" role="alert">
                <strong>Ett fel uppstod:</strong> {coursesError}
              </div>
            )}
            {coursesLoading && <Spinner />}
            {!coursesLoading && courses.length === 0 && (
              <p>Du är inte registrerad på någon kurs.</p>
            )}
            {courses.length > 0 && (
              <ul className="course-list">
                {courses.map(course => (
                  <li key={course.id}>
                    <CourseItem course={course} />
                  </li>
                ))}
              </ul>
            )}
            {coursesHasNext && (
              <div className="text-center">
                <button 
                  type="button" 
                  className="btn btn-outline-primary" 
                  onClick={loadMoreCourses} 
                  disabled={coursesLoading}
                >
                  Ladda fler kurser
                </button>
              </div>
            )}
          </>
          );
        }}
      </Await>
    </Suspense>
  );
};
