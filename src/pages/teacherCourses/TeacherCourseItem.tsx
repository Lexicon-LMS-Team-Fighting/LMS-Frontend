import { useRef, useState } from "react";
import { ICoursePreview, IModulePreview } from "../../features/shared/types";
import { fetchModulesByCourseId } from "../../fetchers/modulesFetcher";
import { usePaginatedLoader } from "../../features/shared/hooks/usePaginatedLoader";
import { TitleDate } from "../../features/shared/components/TitleDate";
import { ProgressBar } from "../../features/shared/components";
import { TeacherModuleList } from "./TeacherModuleList";

interface CourseItemProps {
  course: ICoursePreview;
}

export const CourseItem = (props: CourseItemProps) => {
  const { course } = props;
  const randomProgress = useRef(Math.random()); // Placeholder for actual progress
  const [showModules, setShowModules] = useState(false);

  const paginatedLoader = usePaginatedLoader<IModulePreview>({
    fetchPage: (page) => fetchModulesByCourseId(course.id, page, 3),
  });
  const { items: modules, loadMore: loadMoreModules, error: modulesLoadingError } = paginatedLoader;

  const toggleModules = () => {
    setShowModules(prev => !prev);
    if (!showModules && modules.length === 0) loadMoreModules();
  };

  return (
    <div className="course-item">
      <h1 className="course-title">{course.name}</h1>
      <TitleDate startDate={course.startDate} endDate={course.endDate} />

      <section className="course-progress">
        <h2 className="course-progress-title">Kursframsteg</h2>
        <ProgressBar total={1} completed={randomProgress.current} fullSize />
      </section>

      <div className="text-center">
        <button type="button" onClick={toggleModules} className="btn btn-link modules-toggle">
          {showModules ? "Dölj moduler" : "Visa moduler"}
        </button>
      </div>

      {showModules && (
        <>
          {modulesLoadingError && (
            <div className="alert alert-danger" role="alert">
              <strong>Ett fel uppstod:</strong> {modulesLoadingError}
            </div>
          )}
          <TeacherModuleList
            parinatedLoader={paginatedLoader}
            onProgressChange={() => { }}
            progress={{ [course.id]: { completed: randomProgress.current, total: 1 } }}
          />
        </>
      )}
    </div>
  );
};