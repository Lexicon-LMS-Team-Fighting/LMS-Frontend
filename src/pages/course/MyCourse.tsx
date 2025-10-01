import { Suspense, useCallback, useState } from "react";
import { ModuleList, ProgressBar } from "../../features/shared/components";
import { TitleDate } from "../../features/shared/components/TitleDate";
import { Await, useLoaderData } from "react-router";
import { IMyCourseDifferedLoader } from "../../features/auth/loaders/myCourseLoader";

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

  return (
    <Suspense>
      <Await resolve={myCourse}>
        {(mc) => (
          <main className="course-page">
            <h1 className="course-title">{mc.name}</h1>
            <p className="course-description">{mc.description}</p>
            <TitleDate startDate={mc.startDate} endDate={mc.endDate} />

            <section className="course-progress">
              <h2 className="course-progress-title">Kursframsteg</h2>
              <ProgressBar
                total={courseTotal || 1}
                completed={courseCompleted}
                fullSize={true}
              />
            </section>

            <ModuleList
              modules={mc.modules}
              progress={progress}
              onProgressChange={handleModuleProgressChange}
            />
          </main>
        )}
      </Await>
    </Suspense>
  );
};
