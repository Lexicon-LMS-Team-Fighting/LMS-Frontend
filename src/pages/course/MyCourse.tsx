import { useState } from "react";
import { ModuleList, ProgressBar } from "../../features/shared/components";
import { TitleDate } from "../../features/shared/components/TitleDate";
import { ICourse, IModule } from "../../features/shared/types";

interface IMyCourseProps {
  course: ICourse;
  modules: IModule[];
}

export const MyCourse: React.FC<IMyCourseProps> = ({ course, modules }) => {
  const [progress, setProgress] = useState<Record<string, { completed: number; total: number }>>(
    {}
  );
  const handleModuleProgressChange = (moduleId: string, completed: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      [moduleId]: { completed, total },
    }));
  };

  const courseCompleted = Object.values(progress).reduce((sum, m) => sum + m.completed, 0);
  const courseTotal = Object.values(progress).reduce((sum, m) => sum + m.total, 0);

  return (
    <main className="course-page">
      <h1 className="course-title">{course.name}</h1>
      <p className="course-description">{course.description}</p>
      <TitleDate startDate={course.startDate} endDate={course.endDate} />
      <section className="course-progress">
        <h2 className="course-progress-title">Kursframsteg</h2>
        <ProgressBar total={courseTotal || 1} completed={courseCompleted} fullSize={true} />
      </section>

      <ModuleList
        modules={modules}
        progress={progress}
        onProgressChange={handleModuleProgressChange}
      />
    </main>
  );
};
