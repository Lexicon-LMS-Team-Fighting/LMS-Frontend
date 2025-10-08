import { ReactElement, useState,useCallback } from "react";
import "../features/shared/css/CourseOverview.css";
import { useLoaderData, useLocation } from "react-router";
import type { ICourse } from "../features/shared/types";
import TeacherCourseNavbar, {Tab} from "../features/shared/components/TeacherCourseNavbar";
import { ModuleList, ProgressBar } from "../features/shared/components";

export default function CourseOverview(): ReactElement {
  const loaded = useLoaderData()
  const state = useLocation().state as { course?: ICourse } | null;
  const course = state?.course ?? loaded.courseById;
  const modules =  loaded.courseModules.items
  const [tab, setTab] = useState<Tab>("overview");
  const [progress, setProgress] = useState<Record<string, { completed: number; total: number }>>({});
  const handleModuleProgressChange = useCallback(
(moduleId: string, completed: number, total: number) => {
        setProgress((prev) => ({ ...prev, [moduleId]: { completed, total } }));
      },
      []
    );
  console.log(loaded)

  if (!course) return <main className="main-wrapper">Kursen hittades inte.</main>;

  const start = new Date(course.startDate);
  const end = new Date(course.endDate);

  return (
    <main className="main-wrapper">
      <h1 className="fs-3 mb-2">{course.name}</h1>
              {course.description && <p className="course-overview-p">{course.description}</p>}
      <section className="">
        <p className="course-overview-p"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="date-icon" aria-hidden="true" data-id="element-302"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
        {start.toLocaleDateString()} – {end.toLocaleDateString()}</p>
      </section>

            <section className="tabs-container mb-4">
              <TeacherCourseNavbar value={tab} onChange={setTab} />
            </section>

            {tab === "modules" &&
            <ModuleList modules={modules} progress={progress} onProgressChange={handleModuleProgressChange} />
             }
      
    </main>
  );
}
