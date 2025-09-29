import { useState } from "react";
import { TitleDate } from "../../features/shared/components/TitleDate";
import { ICourse, IModule } from "../../features/shared/types";
interface IMyCourseProps {
  course: ICourse;
  modules: IModule[];
}

export const MyCourse: React.FC<IMyCourseProps> = ({ course, modules }) => {
  return (
    <main className="course-page">
      <h1 className="course-title">{course.name}</h1>
      <p className="course-description">{course.description}</p>
      <TitleDate startDate={course.startDate} endDate={course.endDate} />
      <section className="course-progress">
        <h2 className="course-progress-title">Kursframsteg</h2>
      </section>
    </main>
  );
};
