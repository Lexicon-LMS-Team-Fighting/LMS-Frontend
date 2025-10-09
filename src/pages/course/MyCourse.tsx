import { Suspense, useCallback, useState } from "react";
import { ModuleList, ProgressBar } from "../../features/shared/components";
import { TitleDate } from "../../features/shared/components/TitleDate";
import { Await, useLoaderData } from "react-router";
import { IMyCourseDifferedLoader } from "../../features/auth/loaders/myCourseLoader";
import { ICourseWithModules, IModule } from "../../features/shared/types";
import { Spinner } from "../../features/shared/components/Spinner";
import { AwaitError } from "../../features/shared/components/AwaitError";

export const MyCourse = () => {
  const { myCourse } = useLoaderData<IMyCourseDifferedLoader>();

  const [progress, setProgress] = useState<
    Record<string, { completed: number; total: number }>
  >({});

  const handleModuleProgressChange = useCallback(
    (moduleId: string, completed: number, total: number) => {
      setProgress((prev) => ({ ...prev, [moduleId]: { completed, total } }));
    },
    []
  );

  const courseCompleted = Object.values(progress).reduce(
    (sum, m) => sum + m.completed,
    0
  );
  const courseTotal = Object.values(progress).reduce(
    (sum, m) => sum + m.total,
    0
  );

  function renderCourse(course: ICourseWithModules) {
    return (
      <main className="course-page">
        <h1 className="course-title">{course.name}</h1>
        <p className="course-description">{course.description}</p>
        <TitleDate startDate={course.startDate} endDate={course.endDate} />

        <section className="course-progress">
          <h2 className="course-progress-title">Kursframsteg</h2>
          <ProgressBar
            total={courseTotal || 1}
            completed={courseCompleted}
            fullSize={true}
            preCalcPercentage={course.progress}
          />
        </section>

        {course.modules ? (
          renderModuleList(course.modules)
        ) : (
          <p>No modules..</p>
        )}
      </main>
    );
  }

  function renderModuleList(modules: IModule[]) {
    return (
      <ModuleList
        modules={modules}
        progress={progress}
        onProgressChange={handleModuleProgressChange}
      />
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={myCourse} errorElement={<AwaitError />}>
        {(mc) => (mc ? renderCourse(mc) : <p>No course registered..</p>)}
      </Await>
    </Suspense>
  );
};
